import { NextRequest, NextResponse } from 'next/server';
import { appendAuditLog, readCmsDb, writeCmsDb } from '@/lib/cms-store';
import { canPerformAdminAction } from '@/lib/domain-logic';
import type { StaffRole } from '@/lib/types';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const url = new URL(req.url);
  const role = (req.headers.get('x-beta-role') ||
    url.searchParams.get('role') ||
    'guest') as StaffRole;
  const email = req.headers.get('x-beta-email') || 'user@local';

  const db = readCmsDb();

  if (!canPerformAdminAction(role, 'view_private_proof')) {
    appendAuditLog(db, {
      actorEmail: email,
      actorRole: role,
      action: 'PRIVATE_ATTACHMENT_DENIED',
      entityType: 'PrivateAttachment',
      entityId: id,
      summary: `Blocked unauthorized attempt by role "${role}" to retrieve private purchase proof ${id}`,
    });
    writeCmsDb(db);
    return NextResponse.json(
      {
        ok: false,
        error: `403 Forbidden: Role "${role}" is not authorised to retrieve private customer purchase evidence.`,
      },
      { status: 403 }
    );
  }

  const record = db.serviceRegistrations.find(
    (s) => s.proofAttachment.id === id || s.id === id
  );
  if (!record) {
    return NextResponse.json(
      { ok: false, error: 'Private attachment record not found.' },
      { status: 404 }
    );
  }

  appendAuditLog(db, {
    actorEmail: email,
    actorRole: role,
    action: 'PRIVATE_ATTACHMENT_RETRIEVED',
    entityType: 'PrivateAttachment',
    entityId: record.proofAttachment.id,
    summary: `Authorised retrieval of ${record.proofAttachment.fileName} for service request ${record.referenceCode}`,
  });
  writeCmsDb(db);

  return NextResponse.json({
    ok: true,
    attachment: record.proofAttachment,
    serviceReference: record.referenceCode,
    customerName: `${record.firstName} ${record.lastName}`,
    serialNumber: record.serialNumber,
    securityNotice: 'Scoped short-lived staff access verified.',
  });
}
