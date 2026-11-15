import { NextRequest, NextResponse } from 'next/server';
import { readCmsDb } from '@/lib/cms-store';

function buildMinimalPdfString(title: string, model: string, summary: string): string {
  const cleanTitle = title.replace(/[()\\]/g, '');
  const cleanModel = model.replace(/[()\\]/g, '');
  const cleanSummary = summary.replace(/[()\\]/g, '').slice(0, 110);

  return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 280 >>
stream
BT
/F1 16 Tf
50 720 Td
(BETA DOORS AUSTRALIA - TECHNICAL MANUAL) Tj
/F1 12 Tf
0 -28 Td
(Document: ${cleanTitle}) Tj
0 -20 Td
(Model: ${cleanModel}) Tj
0 -20 Td
(Head Office: 5/1730 Hume Hwy, Campbellfield VIC 3061 | 1300 238 243) Tj
0 -28 Td
(${cleanSummary}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000229 00000 n 
0000000297 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
629
%%EOF`;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const db = readCmsDb();
  const manual = db.manuals.find((m) => m.id === id);

  if (!manual || !manual.published) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Manual not found or currently unpublished. Contact 1300 238 243 for assistance.',
      },
      { status: 404 }
    );
  }

  const pdfString = buildMinimalPdfString(
    manual.label,
    manual.modelName,
    manual.summary
  );

  return new NextResponse(pdfString, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${manual.id}.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
