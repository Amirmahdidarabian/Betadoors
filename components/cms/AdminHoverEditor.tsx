'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Pencil,
  X,
  Check,
  Sparkles,
  Settings,
  Eye,
  EyeOff,
  Layers,
  ShoppingBag,
  Grid,
  Image as ImageIcon,
  Link2,
  Type,
} from 'lucide-react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import type { CategoryCardItem } from '@/lib/types';

interface ExtractedTextItem {
  key: string;
  tag: string;
  label: string;
  currentValue: string;
  element: HTMLElement;
}

interface ExtractedImageItem {
  key: string;
  label: string;
  currentSrc: string;
  currentAlt: string;
  element: HTMLImageElement;
}

interface ExtractedLinkItem {
  key: string;
  hrefKey: string;
  styleKey: string;
  label: string;
  currentText: string;
  currentHref: string;
  currentStyle: 'default' | 'magenta' | 'obsidian' | 'outline';
  element: HTMLAnchorElement;
}

const STUDIO_IMAGE_PRESETS = [
  { label: 'Garage Door Range (16:9)', url: '/assets/studio/cat_01_garage_doors_16x9.png' },
  { label: 'Aria 121 Opener (16:9)', url: '/assets/studio/cat_02_aria_121_opener_16x9.png' },
  { label: 'Roller Door Opener (16:9)', url: '/assets/studio/cat_03_roller_door_opener_16x9.png' },
  { label: 'BETA & LIFE Gate Opener (16:9)', url: '/assets/studio/cat_04_gate_opener_16x9.png' },
  { label: 'Smart Accessories & Keypad (16:9)', url: '/assets/studio/cat_05_smart_accessories_16x9.png' },
  { label: 'Hardware, Springs & Hinges (16:9)', url: '/assets/studio/cat_06_hardware_springs_16x9.png' },
  { label: 'Panel Motor Pack Kit (16:9)', url: '/assets/studio/prod_01_motor_pack_16x9.png' },
  { label: 'Receiver & 3x Remote Pack (16:9)', url: '/assets/studio/prod_03_remote_pack_16x9.png' },
  { label: 'External 2-Ch Receiver (16:9)', url: '/assets/studio/prod_04_external_receiver_16x9.png' },
  { label: 'Single P2011 Remote (16:9)', url: '/assets/studio/prod_05_single_remote_16x9.png' },
];

const DEFAULT_CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: 'cat_01',
    index: '01',
    badge: 'Custom Australian Bays',
    title: '01. Garage Door Range',
    subtitle: 'Insulated Sectional · Single Skin · Roller Doors',
    description:
      'Architectural overhead sectional doors and durable continuous steel roller doors custom-sized for residential & commercial bays.',
    href: '/garage-door-range/',
    artType: 'sectional_door',
  },
  {
    id: 'cat_02',
    index: '02',
    badge: 'Aria 121 Series',
    title: '02. Sectional & Tilt Openers',
    subtitle: 'Featuring the Aria 121 Drive Presentation',
    description:
      'Quiet overhead belt/chain automation with soft-start travel profiling and infrared safety beam integration.',
    href: '/sectional-and-tilt-door-opener-range/',
    artType: 'aria_121',
  },
  {
    id: 'cat_03',
    index: '03',
    badge: '1000N · 1500N · 1800N',
    title: '03. Roller Door Openers',
    subtitle: 'Residential & Heavy-Duty Side Drum Drives',
    description:
      'High-torque side drum drives with dual P2011 handsets, courtesy LED lighting, and wireless wall button.',
    href: '/roller-door-opener-range/',
    artType: 'roller_opener',
  },
  {
    id: 'cat_04',
    index: '04',
    badge: 'BETA & LIFE Italy',
    title: '04. Gate Opener Brands (BETA & LIFE)',
    subtitle: 'BETA B600/B550 · LIFE HP4, OP2, OP3-OP5, HP6',
    description:
      'Sliding and swing gate automation engineered for residential driveways and commercial security perimeters.',
    href: '/gate-opener-brands',
    artType: 'gate_opener',
  },
  {
    id: 'cat_05',
    index: '05',
    badge: 'P2011 & Smart WiFi',
    title: '05. Smart Accessories & Remotes',
    subtitle: 'Remotes · Wireless Keypad · WiFi Camera · Safety Beams',
    description:
      'Genuine P2011 handsets, Mini2-Relay-03 2-channel receivers, optical safety beams, and smart camera modules.',
    href: '/accessories',
    artType: 'keypad',
  },
  {
    id: 'cat_06',
    index: '06',
    badge: 'Springs, Hinges & Cables',
    title: '06. Structural Hardware & Springs',
    subtitle: 'Steel Line, B&D, Gliderol & Centurion Hinges',
    description:
      'Trade replacement hinges, side/middle bearing plates, calibrated torsion springs, and aircraft-grade lifting cables.',
    href: '/hardware',
    artType: 'hardware_kit',
  },
];

function setLeafTextPreservingIcons(el: HTMLElement, newText: string) {
  const textNodes: Text[] = [];
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      textNodes.push(node as Text);
    }
  });
  if (textNodes.length > 0) {
    textNodes[0].textContent = newText;
    for (let i = 1; i < textNodes.length; i++) {
      textNodes[i].textContent = '';
    }
  } else if (el.children.length === 0) {
    el.textContent = newText;
  }
}

function applyButtonVisualStyle(
  el: HTMLElement,
  stylePreset: 'default' | 'magenta' | 'obsidian' | 'outline'
) {
  if (stylePreset === 'default') return;
  if (stylePreset === 'magenta') {
    el.style.backgroundColor = '#EC008C';
    el.style.color = '#FFFFFF';
    el.style.borderColor = '#EC008C';
    el.classList.add('keep-white-text');
  } else if (stylePreset === 'obsidian') {
    el.style.backgroundColor = '#0F172A';
    el.style.color = '#FFFFFF';
    el.style.borderColor = '#334155';
    el.classList.add('keep-white-text');
  } else if (stylePreset === 'outline') {
    el.style.backgroundColor = 'transparent';
    el.style.color = '#EC008C';
    el.style.border = '1px solid #EC008C';
  }
}

export function AdminHoverEditor() {
  const pathname = usePathname() || '/';
  const { brand, pages, products, actor, mutateServer } = useBetaDoors();

  const isStaffEditor =
    actor.role === 'administrator' || actor.role === 'content_editor';

  const [visualStudioQueryActive, setVisualStudioQueryActive] =
    useState<boolean>(false);
  const [hoverModeEnabled, setHoverModeEnabled] = useState<boolean>(true);
  const [dockExpanded, setDockExpanded] = useState<boolean>(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const params = new URLSearchParams(window.location.search);
        setVisualStudioQueryActive(params.get('visualEdit') === '1');
      } catch {
        setVisualStudioQueryActive(false);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  const [hoveredSection, setHoveredSection] = useState<HTMLElement | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string>('Section');
  const [hoveredRect, setHoveredRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const isPointerOnButtonRef = useRef<boolean>(false);

  // Active Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<
    'section_copy' | 'page_header' | 'categories' | 'shop_products' | 'global_brand'
  >('section_copy');
  const [activeEditorTab, setActiveEditorTab] = useState<
    'text' | 'images' | 'links'
  >('text');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Extracted items for generic section editing (Text + Images + Links/Buttons)
  const [extractedItems, setExtractedItems] = useState<ExtractedTextItem[]>([]);
  const [extractedImages, setExtractedImages] = useState<ExtractedImageItem[]>([]);
  const [extractedLinks, setExtractedLinks] = useState<ExtractedLinkItem[]>([]);

  // Page Header Editor Fields
  const [hdrBadge, setHdrBadge] = useState<string>('');
  const [hdrPrimary, setHdrPrimary] = useState<string>('');
  const [hdrGradient, setHdrGradient] = useState<string>('');
  const [hdrSubheadline, setHdrSubheadline] = useState<string>('');
  const [hdrPrimaryCtaLabel, setHdrPrimaryCtaLabel] = useState<string>('');
  const [hdrPrimaryCtaHref, setHdrPrimaryCtaHref] = useState<string>('');
  const [hdrSecondaryCtaLabel, setHdrSecondaryCtaLabel] = useState<string>('');
  const [hdrSecondaryCtaHref, setHdrSecondaryCtaHref] = useState<string>('');
  const [hdrVideoOrImageUrl, setHdrVideoOrImageUrl] = useState<string>('');

  // Category Cards Editor State (including customImageUrl & href!)
  const [catCards, setCatCards] = useState<CategoryCardItem[]>(
    brand.categoryCards && brand.categoryCards.length === 6
      ? brand.categoryCards
      : DEFAULT_CATEGORY_CARDS
  );

  // Shop Quick Editor State (including customImageUrl!)
  const [shopEdits, setShopEdits] = useState<
    Array<{
      id: string;
      name: string;
      sku: string;
      priceDollars: number;
      stockCount: number;
      shortDescription: string;
      customImageUrl: string;
    }>
  >([]);

  // Global Header / Footer Contact State
  const [brandPhone, setBrandPhone] = useState<string>(brand.phone);
  const [brandEmail, setBrandEmail] = useState<string>(brand.email);
  const [brandOffice, setBrandOffice] = useState<string>(brand.headOffice);
  const [footerTagline, setFooterTagline] = useState<string>(
    brand.footerTagline ||
      "We're available Australia wide! Speed in service, Quality in product, Innovation in design."
  );

  const cleanPath =
    pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;

  // Apply persisted brand.siteCopyOverrides (Text + Images + Links + Styles) on any page
  useEffect(() => {
    const overrides = brand.siteCopyOverrides;
    if (!overrides || Object.keys(overrides).length === 0) return;

    const applyOverrides = () => {
      const root = document.getElementById('main-content');
      if (!root) return;

      // 1. Apply Text overrides
      const candidates = root.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, p, span, a, button, li, dt, dd'
      );
      candidates.forEach((el) => {
        if (el.closest('[data-admin-editor-ui="true"]')) return;
        const hasBlockChildren = Array.from(el.children).some((c) =>
          ['DIV', 'SECTION', 'ARTICLE', 'UL', 'H1', 'H2', 'H3', 'P'].includes(
            c.tagName
          )
        );
        if (hasBlockChildren) return;

        const orig = el.dataset.cmsOrigText || (el.textContent || '').trim();
        if (!orig) return;
        if (!el.dataset.cmsOrigText) {
          el.dataset.cmsOrigText = orig;
        }
        const scopedKey = `${cleanPath}::${orig}`;
        const replacement = overrides[scopedKey] ?? overrides[orig];
        if (replacement && replacement !== el.textContent?.trim()) {
          setLeafTextPreservingIcons(el, replacement);
        }
      });

      // 2. Apply Image URL overrides
      const imgs = root.querySelectorAll<HTMLImageElement>('img');
      imgs.forEach((img, idx) => {
        if (img.closest('[data-admin-editor-ui="true"]')) return;
        const origSrc =
          img.dataset.cmsOrigSrc || img.getAttribute('src') || `img_${idx}`;
        if (!img.dataset.cmsOrigSrc) {
          img.dataset.cmsOrigSrc = origSrc;
        }
        const imgKey = `img::${cleanPath}::${origSrc}`;
        const altKey = `alt::${cleanPath}::${origSrc}`;
        if (overrides[imgKey] && img.getAttribute('src') !== overrides[imgKey]) {
          img.src = overrides[imgKey];
          img.srcset = '';
        }
        if (overrides[altKey]) {
          img.alt = overrides[altKey];
        }
      });

      // 3. Apply Link href & Button style overrides
      const anchors = root.querySelectorAll<HTMLAnchorElement>('a');
      anchors.forEach((a, idx) => {
        if (a.closest('[data-admin-editor-ui="true"]')) return;
        const origHref =
          a.dataset.cmsOrigHref || a.getAttribute('href') || `link_${idx}`;
        const origText =
          a.dataset.cmsOrigText || (a.textContent || '').trim() || `${idx}`;
        if (!a.dataset.cmsOrigHref) {
          a.dataset.cmsOrigHref = origHref;
        }
        const hrefKey = `href::${cleanPath}::${origText}`;
        const styleKey = `style::${cleanPath}::${origText}`;
        if (overrides[hrefKey]) {
          a.href = overrides[hrefKey];
        }
        if (overrides[styleKey]) {
          applyButtonVisualStyle(
            a,
            overrides[styleKey] as 'default' | 'magenta' | 'obsidian' | 'outline'
          );
        }
      });
    };

    applyOverrides();
    const timer = window.setTimeout(applyOverrides, 250);
    return () => window.clearTimeout(timer);
  }, [brand.siteCopyOverrides, cleanPath]);

  // Update bounding box of hovered section on scroll/resize
  useEffect(() => {
    if (!isStaffEditor || !hoverModeEnabled || !hoveredSection || modalOpen) {
      return;
    }
    const updatePosition = () => {
      if (!hoveredSection || !document.body.contains(hoveredSection)) {
        setHoveredSection(null);
        setHoveredRect(null);
        return;
      }
      const r = hoveredSection.getBoundingClientRect();
      setHoveredRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isStaffEditor, hoverModeEnabled, hoveredSection, modalOpen]);

  // Detect hovered section on mousemove
  useEffect(() => {
    if (
      !isStaffEditor ||
      !hoverModeEnabled ||
      modalOpen ||
      pathname.startsWith('/admin')
    ) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (isPointerOnButtonRef.current) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-admin-editor-ui="true"]')) return;

      const sectionEl = target.closest<HTMLElement>(
        '[data-cms-section], main section, main article, header, footer'
      );

      if (!sectionEl) {
        setHoveredSection(null);
        setHoveredRect(null);
        return;
      }

      if (sectionEl !== hoveredSection) {
        setHoveredSection(sectionEl);
        const customLabel = sectionEl.dataset.cmsLabel;
        const headingEl = sectionEl.querySelector('h1, h2, h3');
        const headingText = headingEl?.textContent?.trim();
        let label = customLabel || headingText || 'Page Section';
        if (sectionEl.tagName === 'HEADER') {
          label = 'Top Navigation Header';
        } else if (sectionEl.tagName === 'FOOTER') {
          label = 'Site Footer & Contact Info';
        } else if (
          sectionEl.dataset.cmsCustomHeader === 'true' ||
          sectionEl.querySelector('h1')
        ) {
          label = `Page Header (${cleanPath})`;
        }
        setHoveredLabel(label.slice(0, 44));
        const r = sectionEl.getBoundingClientRect();
        setHoveredRect({
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
        });
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [
    isStaffEditor,
    hoverModeEnabled,
    modalOpen,
    hoveredSection,
    pathname,
    cleanPath,
  ]);

  const extractTextsFromSection = (
    sectionEl: HTMLElement
  ): ExtractedTextItem[] => {
    const items: ExtractedTextItem[] = [];
    const seen = new Set<string>();
    const nodes = sectionEl.querySelectorAll<HTMLElement>(
      'h1, h2, h3, h4, p, a, button, span, li'
    );

    nodes.forEach((el) => {
      if (el.closest('[data-admin-editor-ui="true"]')) return;
      if (el.dataset.testid?.startsWith('admin-edit')) return;

      const childBlocks = Array.from(el.children).filter(
        (c) =>
          !['SVG', 'PATH', 'CIRCLE', 'LINE', 'RECT', 'BR'].includes(
            c.tagName.toUpperCase()
          )
      );
      if (childBlocks.length > 1) return;
      if (
        childBlocks.length === 1 &&
        ['SPAN', 'STRONG', 'EM'].includes(childBlocks[0].tagName) &&
        el.tagName !== 'H1'
      ) {
        return;
      }

      const rawText = (el.textContent || '').trim();
      if (!rawText || rawText.length < 2 || rawText.length > 360) return;

      const origKey = el.dataset.cmsOrigText || rawText;
      if (!el.dataset.cmsOrigText) {
        el.dataset.cmsOrigText = origKey;
      }

      const scopedKey = `${cleanPath}::${origKey}`;
      if (seen.has(scopedKey)) return;
      seen.add(scopedKey);

      const tagName = el.tagName.toUpperCase();
      let label = 'Text';
      if (tagName === 'H1') label = 'Main Headline (H1)';
      else if (tagName === 'H2') label = 'Section Heading (H2)';
      else if (tagName === 'H3') label = 'Card / Sub-Heading (H3)';
      else if (tagName === 'P') label = 'Paragraph / Description';
      else if (tagName === 'A' || tagName === 'BUTTON') label = 'Button / Link';
      else label = 'Badge / Label';

      items.push({
        key: scopedKey,
        tag: tagName,
        label,
        currentValue: rawText,
        element: el,
      });
    });

    return items.slice(0, 28);
  };

  const extractImagesFromSection = (
    sectionEl: HTMLElement
  ): ExtractedImageItem[] => {
    const items: ExtractedImageItem[] = [];
    const seen = new Set<string>();
    const imgs = sectionEl.querySelectorAll<HTMLImageElement>('img');

    imgs.forEach((img, idx) => {
      if (img.closest('[data-admin-editor-ui="true"]')) return;
      const origSrc =
        img.dataset.cmsOrigSrc || img.getAttribute('src') || `img_${idx}`;
      if (!img.dataset.cmsOrigSrc) {
        img.dataset.cmsOrigSrc = origSrc;
      }
      const key = `img::${cleanPath}::${origSrc}`;
      if (seen.has(key)) return;
      seen.add(key);

      items.push({
        key,
        label: img.alt || `Section Image #${idx + 1}`,
        currentSrc: img.getAttribute('src') || origSrc,
        currentAlt: img.alt || '',
        element: img,
      });
    });

    return items;
  };

  const extractLinksFromSection = (
    sectionEl: HTMLElement
  ): ExtractedLinkItem[] => {
    const items: ExtractedLinkItem[] = [];
    const seen = new Set<string>();
    const anchors = sectionEl.querySelectorAll<HTMLAnchorElement>('a');

    anchors.forEach((a, idx) => {
      if (a.closest('[data-admin-editor-ui="true"]')) return;
      const rawText = (a.textContent || '').trim();
      if (!rawText || rawText.length < 2 || rawText.length > 90) return;

      const origText = a.dataset.cmsOrigText || rawText;
      if (!a.dataset.cmsOrigText) {
        a.dataset.cmsOrigText = origText;
      }
      const origHref =
        a.dataset.cmsOrigHref || a.getAttribute('href') || `link_${idx}`;
      if (!a.dataset.cmsOrigHref) {
        a.dataset.cmsOrigHref = origHref;
      }

      const key = `${cleanPath}::${origText}`;
      const hrefKey = `href::${cleanPath}::${origText}`;
      const styleKey = `style::${cleanPath}::${origText}`;
      if (seen.has(hrefKey)) return;
      seen.add(hrefKey);

      items.push({
        key,
        hrefKey,
        styleKey,
        label: `Link / Button #${items.length + 1}`,
        currentText: rawText,
        currentHref: a.getAttribute('href') || origHref,
        currentStyle:
          (brand.siteCopyOverrides?.[styleKey] as
            | 'default'
            | 'magenta'
            | 'obsidian'
            | 'outline') || 'default',
        element: a,
      });
    });

    return items.slice(0, 16);
  };

  const openEditorForPageHeader = () => {
    setSaveFeedback(null);
    setActiveEditorTab('text');
    const cmsPage = pages.find(
      (p) => p.slug.replace(/\/$/, '') === cleanPath
    );
    const savedHdr =
      brand.pageHeaders?.[cleanPath] || brand.pageHeaders?.[`${cleanPath}/`];

    const h1El = document.querySelector('main h1');
    const domH1 = h1El?.textContent?.trim() || '';

    if (cleanPath === '/') {
      setHdrBadge('ARIA 121 SERIES');
      setHdrPrimary(brand.heroConfig.headline);
      setHdrGradient('');
      setHdrSubheadline(brand.heroConfig.subheadline);
      setHdrPrimaryCtaLabel(brand.heroConfig.primaryCtaLabel);
      setHdrPrimaryCtaHref(brand.heroConfig.primaryCtaHref);
      setHdrSecondaryCtaLabel(brand.heroConfig.secondaryCtaLabel);
      setHdrSecondaryCtaHref(brand.heroConfig.secondaryCtaHref);
      setHdrVideoOrImageUrl(brand.heroConfig.videoUrl || '/assets/aistudio/logo_motion_ec8a3dd9.mp4');
    } else {
      setHdrBadge(
        savedHdr?.badgeText ||
          cmsPage?.headerBadge ||
          cmsPage?.serviceType ||
          'BETA DOORS AUSTRALIA'
      );
      setHdrPrimary(
        savedHdr?.headlinePrimary || cmsPage?.title || domH1 || 'Page Title'
      );
      setHdrGradient(
        savedHdr?.headlineGradient ?? cmsPage?.headlineGradient ?? ''
      );
      setHdrSubheadline(
        savedHdr?.subheadline ||
          cmsPage?.leadDescription ||
          'Engineered residential & commercial door and gate automation.'
      );
      setHdrPrimaryCtaLabel(
        savedHdr?.primaryCtaLabel ||
          cmsPage?.headerPrimaryCtaLabel ||
          'Request a Technical Quote'
      );
      setHdrPrimaryCtaHref(
        savedHdr?.primaryCtaHref ||
          cmsPage?.headerPrimaryCtaHref ||
          '#page-enquiry-desk'
      );
      setHdrSecondaryCtaLabel(
        savedHdr?.secondaryCtaLabel ||
          cmsPage?.headerSecondaryCtaLabel ||
          'Explore Online Shop'
      );
      setHdrSecondaryCtaHref(
        savedHdr?.secondaryCtaHref ||
          cmsPage?.headerSecondaryCtaHref ||
          '/shop'
      );
    }

    setModalMode('page_header');
    setModalTitle(`Edit Page Header (${cleanPath})`);
    setModalOpen(true);
  };

  const handleOpenSectionEditor = (targetEl?: HTMLElement | null) => {
    const section = targetEl || hoveredSection;
    if (!section) {
      openEditorForPageHeader();
      return;
    }
    setSaveFeedback(null);
    setActiveEditorTab('text');

    // 1. Check if it's the Top Header or Footer
    if (section.tagName === 'HEADER' || section.tagName === 'FOOTER') {
      setBrandPhone(brand.phone);
      setBrandEmail(brand.email);
      setBrandOffice(brand.headOffice);
      setFooterTagline(
        brand.footerTagline ||
          "We're available Australia wide! Speed in service, Quality in product, Innovation in design."
      );
      setExtractedItems(extractTextsFromSection(section));
      setExtractedLinks(extractLinksFromSection(section));
      setExtractedImages(extractImagesFromSection(section));
      setModalMode('global_brand');
      setModalTitle(
        section.tagName === 'HEADER'
          ? 'Edit Top Navigation & Brand Header'
          : 'Edit Global Footer & Contact Details'
      );
      setModalOpen(true);
      return;
    }

    // 2. Check if it's the 6 Product Category Cards section
    if (section.dataset.cmsSection === 'home-product-families') {
      setCatCards(
        brand.categoryCards && brand.categoryCards.length === 6
          ? structuredClone(brand.categoryCards)
          : structuredClone(DEFAULT_CATEGORY_CARDS)
      );
      setExtractedItems(extractTextsFromSection(section).slice(0, 4));
      setModalMode('categories');
      setModalTitle('Edit 06 Product Family Cards (Text, Images & Links)');
      setModalOpen(true);
      return;
    }

    // 3. Check if it's the 5 Shop Products section
    if (section.dataset.cmsSection === 'home-shop-products') {
      setShopEdits(
        products.map((p) => ({
          id: p.id,
          name: p.name,
          sku: p.sku,
          priceDollars: Math.round(p.priceCents / 100),
          stockCount: p.stockCount,
          shortDescription: p.shortDescription,
          customImageUrl: p.customImageUrl || '',
        }))
      );
      setExtractedItems(extractTextsFromSection(section).slice(0, 4));
      setModalMode('shop_products');
      setModalTitle('Edit Direct Storefront (5 Shop Products, Images & Prices)');
      setModalOpen(true);
      return;
    }

    // 4. Check if it's a Page Header section
    if (
      section.dataset.cmsCustomHeader === 'true' ||
      section.querySelector('h1')
    ) {
      openEditorForPageHeader();
      return;
    }

    // 5. Generic Multi-Capability Section Editor (Text + Images + Buttons/Links)
    setExtractedItems(extractTextsFromSection(section));
    setExtractedImages(extractImagesFromSection(section));
    setExtractedLinks(extractLinksFromSection(section));
    setModalMode('section_copy');
    setModalTitle(`Edit ${hoveredLabel}`);
    setModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveFeedback(null);

    if (modalMode === 'page_header') {
      if (cleanPath === '/') {
        await mutateServer('update_brand_hero', {
          heroHeadline: hdrPrimary,
          heroSubheadline: hdrSubheadline,
          primaryCtaLabel: hdrPrimaryCtaLabel,
          primaryCtaHref: hdrPrimaryCtaHref,
          secondaryCtaLabel: hdrSecondaryCtaLabel,
          secondaryCtaHref: hdrSecondaryCtaHref,
          heroVideoUrl: hdrVideoOrImageUrl || brand.heroConfig.videoUrl,
          heroWidth: 1920,
          heroHeight: 1080,
        });
      }
      await mutateServer('update_site_copy_overrides', {
        pagePath: cleanPath,
        pageHeader: {
          badgeText: hdrBadge,
          headlinePrimary: hdrPrimary,
          headlineGradient: hdrGradient,
          subheadline: hdrSubheadline,
          primaryCtaLabel: hdrPrimaryCtaLabel,
          primaryCtaHref: hdrPrimaryCtaHref,
          secondaryCtaLabel: hdrSecondaryCtaLabel,
          secondaryCtaHref: hdrSecondaryCtaHref,
        },
      });
      const cmsPage = pages.find(
        (p) => p.slug.replace(/\/$/, '') === cleanPath
      );
      if (cmsPage) {
        await mutateServer('update_page_full', {
          pageId: cmsPage.id,
          title: hdrPrimary,
          headlineGradient: hdrGradient,
          leadDescription: hdrSubheadline,
          headerBadge: hdrBadge,
          headerPrimaryCtaLabel: hdrPrimaryCtaLabel,
          headerPrimaryCtaHref: hdrPrimaryCtaHref,
          headerSecondaryCtaLabel: hdrSecondaryCtaLabel,
          headerSecondaryCtaHref: hdrSecondaryCtaHref,
        });
      }
    } else if (modalMode === 'categories') {
      const overridesPatch: Record<string, string> = {};
      extractedItems.forEach((item) => {
        setLeafTextPreservingIcons(item.element, item.currentValue);
        overridesPatch[item.key] = item.currentValue;
      });
      await mutateServer('update_site_copy_overrides', {
        overrides: overridesPatch,
        categoryCards: catCards,
      });
    } else if (modalMode === 'shop_products') {
      for (const prod of shopEdits) {
        await mutateServer('update_shop_product', {
          productId: prod.id,
          name: prod.name,
          sku: prod.sku,
          priceCents: Math.round(prod.priceDollars * 100),
          stockCount: prod.stockCount,
          shortDescription: prod.shortDescription,
          customImageUrl: prod.customImageUrl || undefined,
        });
      }
    } else if (modalMode === 'global_brand') {
      const overridesPatch: Record<string, string> = {};
      extractedItems.forEach((item) => {
        setLeafTextPreservingIcons(item.element, item.currentValue);
        overridesPatch[item.key] = item.currentValue;
      });
      extractedLinks.forEach((lnk) => {
        setLeafTextPreservingIcons(lnk.element, lnk.currentText);
        lnk.element.href = lnk.currentHref;
        applyButtonVisualStyle(lnk.element, lnk.currentStyle);
        overridesPatch[lnk.key] = lnk.currentText;
        overridesPatch[lnk.hrefKey] = lnk.currentHref;
        if (lnk.currentStyle !== 'default') {
          overridesPatch[lnk.styleKey] = lnk.currentStyle;
        }
      });
      await mutateServer('update_brand_hero', {
        phone: brandPhone,
        email: brandEmail,
        headOffice: brandOffice,
        footerTagline,
        heroWidth: 1920,
        heroHeight: 1080,
      });
      if (Object.keys(overridesPatch).length > 0) {
        await mutateServer('update_site_copy_overrides', {
          overrides: overridesPatch,
        });
      }
    } else {
      const overridesPatch: Record<string, string> = {};
      extractedItems.forEach((item) => {
        setLeafTextPreservingIcons(item.element, item.currentValue);
        overridesPatch[item.key] = item.currentValue;
      });
      extractedImages.forEach((imgItem) => {
        imgItem.element.src = imgItem.currentSrc;
        imgItem.element.srcset = '';
        imgItem.element.alt = imgItem.currentAlt;
        overridesPatch[imgItem.key] = imgItem.currentSrc;
        overridesPatch[imgItem.key.replace(/^img::/, 'alt::')] =
          imgItem.currentAlt;
      });
      extractedLinks.forEach((lnk) => {
        setLeafTextPreservingIcons(lnk.element, lnk.currentText);
        lnk.element.href = lnk.currentHref;
        applyButtonVisualStyle(lnk.element, lnk.currentStyle);
        overridesPatch[lnk.key] = lnk.currentText;
        overridesPatch[lnk.hrefKey] = lnk.currentHref;
        if (lnk.currentStyle !== 'default') {
          overridesPatch[lnk.styleKey] = lnk.currentStyle;
        }
      });
      await mutateServer('update_site_copy_overrides', {
        overrides: overridesPatch,
      });
    }

    setIsSaving(false);
    setSaveFeedback('Saved & published live to CMS!');
    window.setTimeout(() => {
      setModalOpen(false);
      setSaveFeedback(null);
    }, 550);
  };

  if (!isStaffEditor || !visualStudioQueryActive || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div data-admin-editor-ui="true">
      {/* 1. Floating 0px HUD Hover Outline & Top-Right "✎ Edit Section" Action Button */}
      {hoverModeEnabled &&
        !modalOpen &&
        hoveredRect &&
        hoveredRect.height > 40 &&
        hoveredRect.top + hoveredRect.height > 60 &&
        hoveredRect.top < window.innerHeight - 40 && (
          <div
            style={{
              top: `${Math.max(4, hoveredRect.top - 2)}px`,
              left: `${Math.max(4, hoveredRect.left - 2)}px`,
              width: `${Math.min(window.innerWidth - 8, hoveredRect.width + 4)}px`,
              height: `${hoveredRect.height + 4}px`,
            }}
            className="pointer-events-none fixed z-[90] border border-dashed border-[#EC008C]/90 bg-[#EC008C]/[0.015] transition-all duration-150"
          >
            <div
              onMouseEnter={() => {
                isPointerOnButtonRef.current = true;
              }}
              onMouseLeave={() => {
                isPointerOnButtonRef.current = false;
              }}
              style={{
                top: hoveredRect.top < 84 ? '8px' : '-14px',
              }}
              className="pointer-events-auto absolute right-3 flex items-center gap-1"
            >
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-[#0B0C10] border border-white/20 text-[10px] font-mono text-white shadow-md keep-white-text">
                <Sparkles className="w-2.5 h-2.5 text-[#EC008C]" />
                <span>{hoveredLabel}</span>
              </span>
              <button
                type="button"
                onClick={() => handleOpenSectionEditor(hoveredSection)}
                data-testid="admin-floating-edit-section-btn"
                className="keep-white-text inline-flex items-center gap-1.5 px-3 py-1 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-semibold shadow-[0_6px_20px_rgba(236,0,140,0.55)] border border-white/25 cursor-pointer transition-transform hover:scale-105"
              >
                <Pencil className="w-3 h-3" />
                <span>EDIT SECTION</span>
              </button>
            </div>
          </div>
        )}

      {/* 2. Compact Spinning Settings Gear Button at Bottom-Right that Expands on Hover */}
      <div
        onMouseEnter={() => setDockExpanded(true)}
        onMouseLeave={() => setDockExpanded(false)}
        className="fixed bottom-4 right-4 z-[90] flex items-center bg-[#0B0C10]/95 backdrop-blur-xl border border-[#EC008C]/60 shadow-[0_12px_36px_rgba(0,0,0,0.85)] text-xs transition-all duration-300"
      >
        {/* Expandable Controls Drawer — Hidden when collapsed, expands smoothly on hover */}
        <div
          className={`flex items-center gap-1.5 overflow-hidden transition-all duration-300 ease-out ${
            dockExpanded
              ? 'max-w-[680px] opacity-100 pl-2.5 pr-1.5 py-1.5'
              : 'max-w-0 opacity-0 p-0 pointer-events-none'
          }`}
        >
          <span className="keep-white-text inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EC008C]/20 border border-[#EC008C]/40 text-white font-mono text-[10px] whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-[#EC008C] animate-pulse" />
            <span>ADMIN VISUAL EDITOR</span>
          </span>

          <button
            type="button"
            onClick={openEditorForPageHeader}
            data-testid="admin-bar-edit-header-btn"
            className="keep-white-text inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EC008C] hover:bg-[#d4007d] text-white font-mono text-[11px] font-semibold cursor-pointer transition-colors whitespace-nowrap"
          >
            <Pencil className="w-3 h-3" />
            <span>Edit Page Header</span>
          </button>

          <button
            type="button"
            onClick={() => setHoverModeEnabled((v) => !v)}
            className="keep-white-text inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#181B24] hover:bg-[#232836] border border-white/15 text-slate-100 font-mono text-[11px] cursor-pointer transition-colors whitespace-nowrap"
            title="Toggle hover section outlines"
          >
            {hoverModeEnabled ? (
              <>
                <Eye className="w-3 h-3 text-emerald-400" />
                <span>Hover Edit: ON</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 text-slate-400" />
                <span>Hover Edit: OFF</span>
              </>
            )}
          </button>

          <Link
            href="/admin"
            className="keep-white-text inline-flex items-center gap-1 px-2.5 py-1 bg-[#181B24] hover:bg-[#232836] border border-white/15 text-white font-mono text-[11px] transition-colors whitespace-nowrap"
          >
            <span>Full CMS</span>
          </Link>
        </div>

        {/* Compact Spinning Settings Gear Trigger (Always visible at bottom-right) */}
        <button
          type="button"
          onClick={() => setDockExpanded((v) => !v)}
          aria-label="Admin Visual Editor Settings"
          title="Hover or click to expand Admin Visual Editor"
          className="keep-white-text relative w-10 h-10 bg-[#0B0C10] hover:bg-[#EC008C] text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
        >
          <Settings className="w-4 h-4 text-[#EC008C] group-hover:text-white animate-[spin_7s_linear_infinite]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#EC008C] animate-pulse" />
        </button>
      </div>

      {/* 3. Contextual Multi-Tab Visual Editor Modal (Texts + Images + Links/Buttons) */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={modalTitle}
          data-testid="admin-inline-editor-modal"
          className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-3xl bg-[#0F1117] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[11px] font-mono text-[#EC008C] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>LIVE VISUAL SECTION STUDIO · {cleanPath}</span>
                </div>
                <h2 className="keep-white-text text-lg sm:text-xl font-bold text-white mt-0.5">
                  {modalTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="keep-white-text w-8 h-8 bg-[#181B24] hover:bg-[#EC008C] border border-white/15 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Multi-Capability Tabs for Generic Sections & Global Brand */}
            {(modalMode === 'section_copy' || modalMode === 'global_brand') && (
              <div className="grid grid-cols-3 gap-1 p-1 bg-[#08090C] border border-white/15 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('text')}
                  className={`py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    activeEditorTab === 'text'
                      ? 'bg-[#EC008C] text-white font-semibold keep-white-text'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>TEXT &amp; HEADINGS ({extractedItems.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('images')}
                  className={`py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    activeEditorTab === 'images'
                      ? 'bg-[#EC008C] text-white font-semibold keep-white-text'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>IMAGES &amp; ARTWORK ({extractedImages.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('links')}
                  className={`py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    activeEditorTab === 'links'
                      ? 'bg-[#EC008C] text-white font-semibold keep-white-text'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>BUTTONS &amp; LINKS ({extractedLinks.length})</span>
                </button>
              </div>
            )}

            {saveFeedback && (
              <div className="p-3 bg-emerald-950/90 border border-emerald-500/40 text-xs text-emerald-200 font-medium">
                {saveFeedback}
              </div>
            )}

            <form onSubmit={handleSaveModal} className="space-y-5 text-xs">
              {/* MODE 1: PAGE HEADER EDITOR (Texts + CTAs + Video/Media URL) */}
              {modalMode === 'page_header' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Header Top Badge / Series Label
                    </label>
                    <input
                      type="text"
                      value={hdrBadge}
                      onChange={(e) => setHdrBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Main Header Title (H1 Primary)
                      </label>
                      <input
                        type="text"
                        value={hdrPrimary}
                        onChange={(e) => setHdrPrimary(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Title Accent Words (Optional)
                      </label>
                      <input
                        type="text"
                        value={hdrGradient}
                        onChange={(e) => setHdrGradient(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Header Subtitle / Lead Description
                    </label>
                    <textarea
                      rows={3}
                      value={hdrSubheadline}
                      onChange={(e) => setHdrSubheadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Primary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={hdrPrimaryCtaLabel}
                        onChange={(e) => setHdrPrimaryCtaLabel(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Primary CTA Link URL
                      </label>
                      <input
                        type="text"
                        value={hdrPrimaryCtaHref}
                        onChange={(e) => setHdrPrimaryCtaHref(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Secondary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={hdrSecondaryCtaLabel}
                        onChange={(e) => setHdrSecondaryCtaLabel(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Secondary CTA Link URL
                      </label>
                      <input
                        type="text"
                        value={hdrSecondaryCtaHref}
                        onChange={(e) => setHdrSecondaryCtaHref(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white font-mono"
                      />
                    </div>
                  </div>

                  {cleanPath === '/' && (
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Hero Motion Video URL (.mp4)
                      </label>
                      <input
                        type="text"
                        value={hdrVideoOrImageUrl}
                        onChange={(e) => setHdrVideoOrImageUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white font-mono"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: 6 PRODUCT CATEGORY CARDS EDITOR (Titles, Badges, Links & Custom Images!) */}
              {modalMode === 'categories' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-300 font-semibold">
                    <Grid className="w-4 h-4 text-[#EC008C]" />
                    <span>
                      Edit All 06 Product Family Cards (Titles, Badges, Links &amp; Custom 16:9 Images)
                    </span>
                  </div>
                  <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                    {catCards.map((card, idx) => (
                      <div
                        key={card.id}
                        className="p-4 bg-[#08090C] border border-white/15 space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Card #{idx + 1} Title
                            </label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={(e) => {
                                const next = [...catCards];
                                next[idx] = { ...card, title: e.target.value };
                                setCatCards(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Top-Right Badge
                            </label>
                            <input
                              type="text"
                              value={card.badge}
                              onChange={(e) => {
                                const next = [...catCards];
                                next[idx] = { ...card, badge: e.target.value };
                                setCatCards(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Subtitle (Pink Mono)
                            </label>
                            <input
                              type="text"
                              value={card.subtitle}
                              onChange={(e) => {
                                const next = [...catCards];
                                next[idx] = {
                                  ...card,
                                  subtitle: e.target.value,
                                };
                                setCatCards(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Custom 16:9 Image URL (or leave default studio photo)
                            </label>
                            <input
                              type="text"
                              placeholder="/assets/studio/cat_01_garage_doors_16x9.png"
                              value={card.customImageUrl || ''}
                              onChange={(e) => {
                                const next = [...catCards];
                                next[idx] = {
                                  ...card,
                                  customImageUrl: e.target.value || undefined,
                                };
                                setCatCards(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Destination Link URL
                            </label>
                            <input
                              type="text"
                              value={card.href}
                              onChange={(e) => {
                                const next = [...catCards];
                                next[idx] = { ...card, href: e.target.value };
                                setCatCards(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={card.description}
                            onChange={(e) => {
                              const next = [...catCards];
                              next[idx] = {
                                ...card,
                                description: e.target.value,
                              };
                              setCatCards(next);
                            }}
                            className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODE 3: 5 SHOP PRODUCTS QUICK EDITOR (Names, Prices, Stock & Custom Images!) */}
              {modalMode === 'shop_products' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-300 font-semibold">
                    <ShoppingBag className="w-4 h-4 text-[#EC008C]" />
                    <span>
                      Edit All 5 Online Shop Products (Names, Prices, Stock &amp; Product Photos)
                    </span>
                  </div>
                  <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                    {shopEdits.map((prod, idx) => (
                      <div
                        key={prod.id}
                        className="p-4 bg-[#08090C] border border-white/15 space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-slate-400 mb-1">
                              Product Name
                            </label>
                            <input
                              type="text"
                              value={prod.name}
                              onChange={(e) => {
                                const next = [...shopEdits];
                                next[idx] = { ...prod, name: e.target.value };
                                setShopEdits(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Price ($ AUD)
                            </label>
                            <input
                              type="number"
                              value={prod.priceDollars}
                              onChange={(e) => {
                                const next = [...shopEdits];
                                next[idx] = {
                                  ...prod,
                                  priceDollars: Number(e.target.value),
                                };
                                setShopEdits(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Stock Count
                            </label>
                            <input
                              type="number"
                              value={prod.stockCount}
                              onChange={(e) => {
                                const next = [...shopEdits];
                                next[idx] = {
                                  ...prod,
                                  stockCount: Number(e.target.value),
                                };
                                setShopEdits(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Custom Product Photo URL (16:9)
                            </label>
                            <input
                              type="text"
                              placeholder="/assets/studio/prod_01_motor_pack_16x9.png"
                              value={prod.customImageUrl}
                              onChange={(e) => {
                                const next = [...shopEdits];
                                next[idx] = {
                                  ...prod,
                                  customImageUrl: e.target.value,
                                };
                                setShopEdits(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Short Description
                            </label>
                            <input
                              type="text"
                              value={prod.shortDescription}
                              onChange={(e) => {
                                const next = [...shopEdits];
                                next[idx] = {
                                  ...prod,
                                  shortDescription: e.target.value,
                                };
                                setShopEdits(next);
                              }}
                              className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODE 4: GLOBAL HEADER / FOOTER CONTACT & LINKS */}
              {modalMode === 'global_brand' && activeEditorTab === 'text' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Direct Phone
                      </label>
                      <input
                        type="text"
                        value={brandPhone}
                        onChange={(e) => setBrandPhone(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#08090C] border border-white/15 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Support Email
                      </label>
                      <input
                        type="text"
                        value={brandEmail}
                        onChange={(e) => setBrandEmail(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#08090C] border border-white/15 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Head Office Address
                      </label>
                      <input
                        type="text"
                        value={brandOffice}
                        onChange={(e) => setBrandOffice(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#08090C] border border-white/15 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Footer Tagline
                    </label>
                    <input
                      type="text"
                      value={footerTagline}
                      onChange={(e) => setFooterTagline(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#08090C] border border-white/15 text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 1: EXTRACTED SECTION TEXT ELEMENTS */}
              {(modalMode === 'section_copy' || modalMode === 'global_brand') &&
                activeEditorTab === 'text' && (
                  <div className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                    {extractedItems.map((item, idx) => (
                      <div
                        key={item.key}
                        className="p-3.5 bg-[#08090C] border border-white/15 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff7ac6]">
                            {item.label} ({item.tag})
                          </span>
                        </div>
                        {item.currentValue.length > 90 ? (
                          <textarea
                            rows={2}
                            value={item.currentValue}
                            onChange={(e) => {
                              const next = [...extractedItems];
                              next[idx] = {
                                ...item,
                                currentValue: e.target.value,
                              };
                              setExtractedItems(next);
                            }}
                            className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                          />
                        ) : (
                          <input
                            type="text"
                            value={item.currentValue}
                            onChange={(e) => {
                              const next = [...extractedItems];
                              next[idx] = {
                                ...item,
                                currentValue: e.target.value,
                              };
                              setExtractedItems(next);
                            }}
                            className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

              {/* TAB 2: EXTRACTED SECTION IMAGES & STUDIO PRESETS */}
              {(modalMode === 'section_copy' || modalMode === 'global_brand') &&
                activeEditorTab === 'images' && (
                  <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                    {extractedImages.length === 0 ? (
                      <div className="p-6 bg-[#08090C] border border-white/15 text-center space-y-2 text-slate-400">
                        <ImageIcon className="w-6 h-6 text-[#EC008C] mx-auto" />
                        <p>
                          No direct image elements found in this section. Hover over a product or category section to swap studio photos, or edit the Page Header video/media.
                        </p>
                      </div>
                    ) : (
                      extractedImages.map((imgItem, idx) => (
                        <div
                          key={imgItem.key}
                          className="p-4 bg-[#08090C] border border-white/15 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff7ac6]">
                              IMAGE #{idx + 1} · {imgItem.label}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2 space-y-2">
                              <label className="block text-slate-400">
                                Image Source URL (`src`)
                              </label>
                              <input
                                type="text"
                                value={imgItem.currentSrc}
                                onChange={(e) => {
                                  const next = [...extractedImages];
                                  next[idx] = {
                                    ...imgItem,
                                    currentSrc: e.target.value,
                                  };
                                  setExtractedImages(next);
                                }}
                                className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                              />
                              <label className="block text-slate-400">
                                Quick-Select Studio 16:9 Preset
                              </label>
                              <select
                                value=""
                                onChange={(e) => {
                                  if (!e.target.value) return;
                                  const next = [...extractedImages];
                                  next[idx] = {
                                    ...imgItem,
                                    currentSrc: e.target.value,
                                  };
                                  setExtractedImages(next);
                                }}
                                className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                              >
                                <option value="">Choose a studio 16:9 image preset...</option>
                                {STUDIO_IMAGE_PRESETS.map((preset) => (
                                  <option key={preset.url} value={preset.url}>
                                    {preset.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-slate-400">
                                Alt Text (SEO)
                              </label>
                              <input
                                type="text"
                                value={imgItem.currentAlt}
                                onChange={(e) => {
                                  const next = [...extractedImages];
                                  next[idx] = {
                                    ...imgItem,
                                    currentAlt: e.target.value,
                                  };
                                  setExtractedImages(next);
                                }}
                                className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

              {/* TAB 3: EXTRACTED LINKS, BUTTONS & VISUAL STYLES */}
              {(modalMode === 'section_copy' || modalMode === 'global_brand') &&
                activeEditorTab === 'links' && (
                  <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                    {extractedLinks.length === 0 ? (
                      <div className="p-6 bg-[#08090C] border border-white/15 text-center text-slate-400">
                        No interactive links or CTA buttons detected in this section.
                      </div>
                    ) : (
                      extractedLinks.map((lnk, idx) => (
                        <div
                          key={lnk.hrefKey}
                          className="p-3.5 bg-[#08090C] border border-white/15 space-y-2.5"
                        >
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#ff7ac6]">
                            {lnk.label}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-slate-400 mb-1">
                                Button / Link Label
                              </label>
                              <input
                                type="text"
                                value={lnk.currentText}
                                onChange={(e) => {
                                  const next = [...extractedLinks];
                                  next[idx] = {
                                    ...lnk,
                                    currentText: e.target.value,
                                  };
                                  setExtractedLinks(next);
                                }}
                                className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 mb-1">
                                Destination URL (`href`)
                              </label>
                              <input
                                type="text"
                                value={lnk.currentHref}
                                onChange={(e) => {
                                  const next = [...extractedLinks];
                                  next[idx] = {
                                    ...lnk,
                                    currentHref: e.target.value,
                                  };
                                  setExtractedLinks(next);
                                }}
                                className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 mb-1">
                                Button Visual Style
                              </label>
                              <select
                                value={lnk.currentStyle}
                                onChange={(e) => {
                                  const next = [...extractedLinks];
                                  next[idx] = {
                                    ...lnk,
                                    currentStyle: e.target.value as
                                      | 'default'
                                      | 'magenta'
                                      | 'obsidian'
                                      | 'outline',
                                  };
                                  setExtractedLinks(next);
                                }}
                                className="w-full px-3 py-2 bg-[#111318] border border-white/15 text-white"
                              >
                                <option value="default">Default Theme Style</option>
                                <option value="magenta">Brand Magenta (#EC008C)</option>
                                <option value="obsidian">Obsidian Dark (#0F172A)</option>
                                <option value="outline">Sharp HUD Magenta Outline</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <Link
                  href="/admin"
                  className="text-xs text-slate-400 hover:text-white underline font-mono"
                >
                  Open Full Admin CMS Dashboard →
                </Link>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-[#181B24] hover:bg-[#232836] border border-white/15 text-white font-mono font-medium cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    data-testid="admin-modal-save-btn"
                    className="keep-white-text inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white font-mono font-semibold shadow-lg cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {isSaving ? 'SAVING...' : 'SAVE & PUBLISH CHANGES'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
