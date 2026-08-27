import { CONTACT, MOTTO } from "./contact";
import type { DocField, EmailDocument } from "./enrolment";

/* Renders an EmailDocument as a branded HTML email.

   Written to the constraints of mail clients rather than of browsers: tables for
   layout, inline styles only, no flex/grid, no external CSS or webfonts. Outlook
   ignores border-radius and Gmail strips <style> blocks, so nothing here depends
   on either. The result degrades to a readable stack on a phone.

   It takes the generic document shape, so any future transactional mail — an
   applicant acknowledgement, a contact enquiry — can reuse it by building an
   EmailDocument instead of hand-writing more HTML. */

const INK = "#311049";
const INK_SOFT = "#574164";
const MUTE = "#786a85";
const VIOLET = "#6a2cad";
const TINT = "#efe6fa";
const PAPER = "#f6eff4";
const ROSE = "#f9a8cd";
const LINE = "#e7dcee";

/* the brand faces are not available to mail clients — this is the fallback stack
   they will actually render */
const FONT =
	"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif";

export function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/* a value typed into a textarea carries real line breaks; they are meaningful */
function multiline(s: string): string {
	return escapeHtml(s).replace(/\r?\n/g, "<br />");
}

function fieldRow(f: DocField): string {
	if (f.wide) {
		/* colspan, or it would be squeezed into the label column of the two-up
		   rows it sits among */
		return `<tr><td colspan="2" style="padding:2px 0 14px;">
      <div style="font-size:12px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:${MUTE};padding-bottom:6px;">${escapeHtml(f.label)}</div>
      <div style="font-size:15px;line-height:1.6;color:${INK_SOFT};background:${PAPER};border-radius:10px;padding:12px 14px;">${multiline(f.value)}</div>
    </td></tr>`;
	}
	return `<tr>
    <td width="45%" style="padding:9px 12px 9px 0;font-size:14px;color:${MUTE};border-bottom:1px solid ${LINE};vertical-align:top;">${escapeHtml(f.label)}</td>
    <td style="padding:9px 0;font-size:15px;font-weight:600;color:${INK};border-bottom:1px solid ${LINE};vertical-align:top;">${multiline(f.value)}</td>
  </tr>`;
}

function section(title: string, fields: DocField[]): string {
	return `<tr><td style="padding:26px 0 0;">
    <div style="font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${VIOLET};padding-bottom:8px;">${escapeHtml(title)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fields.map(fieldRow).join("")}</table>
  </td></tr>`;
}

function highlightCell(f: DocField): string {
	return `<td style="padding:6px 22px 6px 0;vertical-align:top;">
    <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${VIOLET};padding-bottom:3px;">${escapeHtml(f.label)}</div>
    <div style="font-size:15px;font-weight:700;color:${INK};">${escapeHtml(f.value)}</div>
  </td>`;
}

export function renderEmailDocument(doc: EmailDocument): string {
	const highlight = doc.highlight.length
		? `<tr><td style="padding:22px 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${TINT};border-radius:14px;">
        <tr><td style="padding:14px 18px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${doc.highlight.map(highlightCell).join("")}</tr></table>
        </td></tr>
      </table>
    </td></tr>`
		: "";

	return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(doc.eyebrow)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};font-family:${FONT};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(doc.intro)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
<tr><td align="center" style="padding:28px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px -28px rgba(74,20,95,0.45);">

  <tr><td style="background:${INK};padding:26px 32px 24px;">
    <div style="font-size:17px;font-weight:700;color:#ffffff;letter-spacing:-0.2px;">NexaHubTech</div>
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ROSE};padding-top:14px;">${escapeHtml(doc.eyebrow)}</div>
    <div style="font-size:27px;font-weight:800;color:#ffffff;padding-top:6px;line-height:1.2;">${escapeHtml(doc.heading)}</div>
    <div style="width:56px;height:3px;background:#f06ba8;border-radius:2px;margin-top:16px;font-size:0;line-height:0;">&nbsp;</div>
  </td></tr>

  <tr><td style="padding:26px 32px 30px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-size:15px;line-height:1.65;color:${INK_SOFT};">${escapeHtml(doc.intro)}</td></tr>
      ${highlight}
      ${doc.sections.map((s) => section(s.title, s.fields)).join("")}
    </table>
  </td></tr>

  <tr><td style="background:${PAPER};padding:20px 32px;border-top:1px solid ${LINE};">
    <div style="font-size:13px;color:${MUTE};line-height:1.6;">${escapeHtml(doc.footNote)}</div>
    <div style="font-size:13px;color:${MUTE};line-height:1.6;padding-top:8px;">
      <strong style="color:${INK};">NexaHubTech</strong> — ${escapeHtml(MOTTO)}<br />
      ${escapeHtml(CONTACT.address)} · ${escapeHtml(CONTACT.phoneDisplay)}<br />
      <a href="${CONTACT.websiteHref}" style="color:${VIOLET};text-decoration:none;">${escapeHtml(CONTACT.website)}</a> · RC ${escapeHtml(CONTACT.rc)}
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}
