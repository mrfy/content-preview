import { sanitizeHtml } from '~/utils/sanitize'

export interface EmailTemplate {
  name: string
  description: string
  html: string
}

const templates: EmailTemplate[] = [
  {
    name: 'Newsletter',
    description: 'Clean newsletter with header, content and CTA',
    html: `<!DOCTYPE html><html><head><style>
body{margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4}
.c{max-width:600px;margin:0 auto;background:#fff}
.h{background:#4F46E5;color:#fff;padding:32px;text-align:center}
.h h1{margin:0;font-size:24px}
.ct{padding:32px;color:#333;line-height:1.6}
.cta{text-align:center;padding:24px}
.cta a{background:#4F46E5;color:#fff;padding:12px 32px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block}
.ft{background:#f8f8f8;padding:24px;text-align:center;color:#999;font-size:12px}
</style></head><body><div class="c"><div class="h"><h1>Your Newsletter</h1></div><div class="ct"><h2>Hello there!</h2><p>This is a sample newsletter template. Edit this HTML to preview your own designs.</p><p>Features you can test:</p><ul><li>Custom styling and colors</li><li>Images and links</li><li>Responsive layouts</li><li>Call-to-action buttons</li></ul></div><div class="cta"><a href="#">Get Started Today</a></div><div class="ft"><p>You received this email because you subscribed to our newsletter.</p><p><a href="#" style="color:#999">Unsubscribe</a></p></div></div></body></html>`,
  },
  {
    name: 'Welcome Email',
    description: 'Onboarding welcome message for new users',
    html: `<!DOCTYPE html><html><head><style>
body{margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f0f0}
.wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden}
.hero{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:48px 32px;text-align:center;color:#fff}
.hero h1{margin:0 0 8px;font-size:28px;font-weight:700}
.hero p{margin:0;opacity:0.9;font-size:16px}
.body{padding:32px}
.body h2{color:#333;margin:0 0 16px;font-size:20px}
.body p{color:#666;line-height:1.7;margin:0 0 16px}
.steps{margin:24px 0}
.step{display:flex;margin-bottom:16px;align-items:flex-start}
.step-num{background:#667eea;color:#fff;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-size:14px;font-weight:bold;margin-right:12px;flex-shrink:0}
.step-text{color:#444;font-size:14px;line-height:1.5;padding-top:3px}
.cta{text-align:center;padding:8px 32px 32px}
.cta a{background:#667eea;color:#fff;padding:14px 40px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:16px}
.ft{background:#fafafa;padding:24px;text-align:center;color:#aaa;font-size:11px;border-top:1px solid #eee}
</style></head><body><div class="wrap"><div class="hero"><h1>Welcome aboard!</h1><p>We're excited to have you here</p></div><div class="body"><h2>Get started in 3 easy steps</h2><p>Here's everything you need to know to make the most of your account.</p><div class="steps"><div class="step"><div class="step-num">1</div><div class="step-text"><strong>Complete your profile</strong><br>Add your photo and bio to personalize your experience.</div></div><div class="step"><div class="step-num">2</div><div class="step-text"><strong>Explore features</strong><br>Check out the dashboard and discover what's possible.</div></div><div class="step"><div class="step-num">3</div><div class="step-text"><strong>Invite your team</strong><br>Collaboration is better together.</div></div></div></div><div class="cta"><a href="#">Go to Dashboard</a></div><div class="ft"><p>Questions? Reply to this email or visit our help center.</p></div></div></body></html>`,
  },
  {
    name: 'Promotional',
    description: 'Sale announcement with bold visuals',
    html: `<!DOCTYPE html><html><head><style>
body{margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4}
.wrap{max-width:600px;margin:0 auto;background:#fff}
.banner{background:#1a1a2e;padding:48px 32px;text-align:center;color:#fff}
.banner .tag{display:inline-block;background:#e94560;color:#fff;padding:4px 16px;border-radius:20px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px}
.banner h1{margin:0 0 8px;font-size:36px;font-weight:800}
.banner .sub{font-size:18px;opacity:0.8;margin:0}
.body{padding:32px;text-align:center}
.body h2{color:#1a1a2e;margin:0 0 12px;font-size:22px}
.body p{color:#666;line-height:1.6;margin:0 0 24px}
.grid{margin:0 0 24px}
.grid table{width:100%;border-collapse:collapse}
.grid td{padding:12px;text-align:center;width:50%;vertical-align:top}
.price{font-size:14px;color:#999;text-decoration:line-through}
.new-price{font-size:24px;color:#e94560;font-weight:800}
.item-name{font-size:14px;color:#333;margin-top:8px}
.cta{text-align:center;padding:0 32px 32px}
.cta a{background:#e94560;color:#fff;padding:16px 48px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:16px;text-transform:uppercase;letter-spacing:1px}
.ft{background:#f8f8f8;padding:20px;text-align:center;color:#999;font-size:11px}
</style></head><body><div class="wrap"><div class="banner"><div class="tag">Limited Time</div><h1>50% OFF</h1><p class="sub">Everything. This weekend only.</p></div><div class="body"><h2>Our Biggest Sale Ever</h2><p>Don't miss out on incredible savings across all categories.</p><div class="grid"><table><tr><td><div class="price">$99</div><div class="new-price">$49</div><div class="item-name">Premium Plan</div></td><td><div class="price">$199</div><div class="new-price">$99</div><div class="item-name">Business Plan</div></td></tr></table></div></div><div class="cta"><a href="#">Shop Now</a></div><div class="ft"><p>Offer valid through Sunday at midnight. <a href="#" style="color:#999">Unsubscribe</a></p></div></div></body></html>`,
  },
  {
    name: 'Transactional',
    description: 'Order confirmation / receipt',
    html: `<!DOCTYPE html><html><head><style>
body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5}
.wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden}
.hd{padding:24px 32px;border-bottom:1px solid #eee}
.hd h1{margin:0;font-size:18px;color:#333}
.hd .order{color:#888;font-size:13px;margin-top:4px}
.check{text-align:center;padding:32px;background:#f0fdf4}
.check .icon{font-size:48px;margin-bottom:8px}
.check h2{margin:0;color:#16a34a;font-size:20px}
.check p{color:#666;margin:8px 0 0;font-size:14px}
.items{padding:24px 32px}
.items table{width:100%;border-collapse:collapse}
.items th{text-align:left;padding:8px 0;font-size:12px;color:#999;text-transform:uppercase;border-bottom:1px solid #eee}
.items td{padding:12px 0;font-size:14px;color:#333;border-bottom:1px solid #f5f5f5}
.items .right{text-align:right}
.total{padding:16px 32px;background:#fafafa;border-top:2px solid #eee}
.total table{width:100%}
.total td{padding:4px 0;font-size:14px;color:#333}
.total .big{font-size:18px;font-weight:700}
.ft{padding:24px 32px;text-align:center;color:#aaa;font-size:11px}
</style></head><body><div class="wrap"><div class="hd"><h1>Order Confirmed</h1><div class="order">Order #CPT-2026-0042 &middot; March 14, 2026</div></div><div class="check"><div class="icon">&#10003;</div><h2>Thank you for your purchase!</h2><p>Your order is being processed and will ship within 24 hours.</p></div><div class="items"><table><tr><th>Item</th><th class="right">Price</th></tr><tr><td>Content Preview Pro (Annual)</td><td class="right">$99.00</td></tr><tr><td>Priority Support Add-on</td><td class="right">$29.00</td></tr></table></div><div class="total"><table><tr><td>Subtotal</td><td class="right">$128.00</td></tr><tr><td>Tax</td><td class="right">$0.00</td></tr><tr><td class="big">Total</td><td class="right big">$128.00</td></tr></table></div><div class="ft"><p>Questions about your order? <a href="#" style="color:#4F46E5">Contact support</a></p></div></div></body></html>`,
  },
  {
    name: 'Minimal',
    description: 'Simple text-based email',
    html: `<!DOCTYPE html><html><head><style>
body{margin:0;padding:0;font-family:Georgia,'Times New Roman',serif;background:#fafafa}
.wrap{max-width:560px;margin:0 auto;background:#fff;padding:48px 40px}
.wrap h1{font-size:24px;color:#111;margin:0 0 24px;font-weight:normal}
.wrap p{color:#444;line-height:1.8;font-size:16px;margin:0 0 16px}
.wrap a{color:#4F46E5}
.sig{margin-top:32px;padding-top:24px;border-top:1px solid #eee;color:#888;font-size:14px}
</style></head><body><div class="wrap"><h1>A quick update</h1><p>Hi there,</p><p>Just wanted to let you know that we've shipped some exciting updates this week. The new preview engine is faster, more accurate, and supports dark mode.</p><p>We'd love to hear your feedback. Just reply to this email or <a href="#">schedule a call</a> with our team.</p><p>Thanks for being an early supporter. It means a lot.</p><div class="sig"><p>Best,<br><strong>The Content Preview Team</strong></p></div></div></body></html>`,
  },
]

const htmlContent = ref('')
const sanitizedHtml = computed(() => sanitizeHtml(htmlContent.value))

export function useEmailPreview() {

  function loadTemplate(index: number) {
    if (index >= 0 && index < templates.length) {
      htmlContent.value = templates[index].html
    }
  }

  function loadDefault() {
    loadTemplate(0)
  }

  function clear() {
    htmlContent.value = ''
  }

  return {
    htmlContent,
    sanitizedHtml,
    templates,
    loadTemplate,
    loadDefault,
    clear,
  }
}
