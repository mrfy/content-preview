import DOMPurify from 'dompurify'

export function sanitizeHtml(raw: string): string {
  if (typeof window === 'undefined') return ''

  return DOMPurify.sanitize(raw, {
    WHOLE_DOCUMENT: true,
    ALLOWED_TAGS: [
      'html', 'head', 'body', 'meta', 'title',
      'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot',
      'img', 'a', 'p', 'div', 'span',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'br', 'hr',
      'strong', 'em', 'b', 'i', 'u',
      'center', 'style',
      'blockquote', 'pre', 'code',
      'header', 'footer', 'section', 'article',
      'sup', 'sub', 'small',
    ],
    ALLOWED_ATTR: [
      'style', 'class', 'id', 'href', 'src', 'alt',
      'width', 'height', 'align', 'valign',
      'bgcolor', 'border', 'cellpadding', 'cellspacing',
      'colspan', 'rowspan', 'target',
    ],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onmouseout', 'onfocus', 'onblur'],
    ALLOW_DATA_ATTR: false,
  })
}
