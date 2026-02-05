import React, { useState, useMemo } from 'react';
import {
    FileText,
    Receipt,
    Plus,
    Trash2,
    Printer,
    CheckCircle,
    ChevronLeft,
    ArrowRight,
    Download,
    Edit,
    Building2,
    Calendar,
    User,
    CreditCard,
    Home,
    Settings,
    Phone
} from 'lucide-react';

/* =====================================================================
   TEMPLATES (Embedded)
   ===================================================================== */
const INVOICE_TEMPLATE = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>請求書</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{--color-black:#3b3b3b;--color-dark-gray:#333;--color-gray:#555;--color-light-gray:#ddd;--color-bg-gray:#f0f0f0;--color-white:#fff;--font-jp:'Noto Sans JP',sans-serif;--font-en:'Lato',sans-serif;--line-heavy:2px solid var(--color-black);--line-thin:1px solid var(--color-black);--line-dotted:1px dotted #999;--left-col-width:60%;--right-col-width:40%}
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--font-jp);background-color:#555;padding:40px;display:flex;justify-content:center;color:var(--color-black);line-height:1.5}
@page{size:A4;margin:0}.page{background:var(--color-white);width:210mm;min-height:297mm;padding:20mm 20mm;box-shadow:0 4px 20px rgba(0,0,0,0.3);position:relative;display:flex;flex-direction:column}
@media print{body{background:none;padding:0}.page{box-shadow:none;margin:0;width:100%;height:100%}}
.font-en{font-family:var(--font-en)}.text-right{text-align:right}.text-center{text-align:center}.font-bold{font-weight:700}.font-heavy{font-weight:900}
.row-container{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px}.col-left{width:var(--left-col-width)}.col-right{width:var(--right-col-width)}
.header-title{font-size:55px;font-weight:900;margin-bottom:60px;letter-spacing:0.1em}
.client-name-box{border-bottom:var(--line-heavy);padding-bottom:4px;margin-bottom:5px;display:flex;justify-content:space-between;align-items:baseline;width:100%}
.client-name{font-size:22px;font-weight:900}.client-honorific{font-size:22px;font-weight:900}
.meta-list{text-align:right;font-size:10px;font-weight:700}.meta-row{display:flex;justify-content:flex-end;margin-bottom:8px}
.meta-label{width:40px;text-align:left}.meta-value{width:135px;text-align:right;font-family:var(--font-en)}
.intro-text{font-size:12px;margin-bottom:10px}.middle-section{display:flex;justify-content:space-between;align-items:stretch;margin-bottom:30px}
.amount-container{width:var(--left-col-width)}.amount-row{background-color:var(--color-bg-gray);padding:15px 15px;display:flex;justify-content:space-between;align-items:center;border-bottom:var(--line-thin)}
.amount-label{font-size:14px;font-weight:700}.amount-value{font-size:22px;font-weight:900}.currency-symbol{font-size:14px;margin-left:5px}
.due-date-row{background-color:var(--color-bg-gray);padding:10px 15px;display:flex;justify-content:space-between;align-items:center;border-bottom:var(--line-heavy)}
.due-date-label{font-size:14px;font-weight:700}.due-date-value{font-size:14px;font-weight:900;font-family:var(--font-en)}
.company-info-wrapper{width:var(--right-col-width);display:flex;flex-direction:column;justify-content:flex-end;text-align:right}
.company-name{font-size:14px;font-weight:900;letter-spacing:0.1em;margin-bottom:2px}.company-person{font-size:12px;font-weight:700;margin-bottom:8px}.company-details{font-size:10px;line-height:1.6;font-weight:700}
.table-container{margin-bottom:15px}.details-table{width:100%;border-collapse:collapse}
.details-table th{background-color:var(--color-black);color:var(--color-white);font-size:12px;font-weight:700;padding:8px 0;text-align:center;border-right:1px dotted #777}
.details-table th:last-child{border-right:none}.item-row td{height:40px;border-bottom:var(--line-thin);border-right:var(--line-dotted);font-size:12px;font-weight:700;padding:0 8px;vertical-align:middle;text-align:center !important}
.item-row td:last-child{border-right:none}.item-row:last-child td{border-bottom:var(--line-heavy)}
.col-id{width:10%}.col-name{width:50%}.col-price{width:15%}.col-qty{width:10%}.col-amount{width:15%}
.footer-row{display:flex;justify-content:space-between;align-items:flex-start}.bank-info{font-size:12px;font-weight:700;padding-right:20px}
.bank-title{font-size:14px;font-weight:700;margin-bottom:3px}.bank-note{font-size:12px;margin-bottom:12px}
.bank-list .row{display:flex;margin-bottom:6px}.bank-label{width:4em;text-align-last:justify;margin-right:0%}
.totals-box{width:100%}.total-row{display:flex;justify-content:space-between;padding:9px 10px;border-bottom:var(--line-thin);font-size:12px;font-weight:900;align-items:center}
.total-row:last-child{border-bottom:var(--line-heavy);padding:12px 10px}.total-val{font-family:var(--font-en)}
.price-num{font-size:14px;font-weight:900;letter-spacing:1px}.remarks-section{margin-top:25px;display:flex;align-items:stretch;gap:10px}
.remarks-title{width:70px;font-size:12px;font-weight:900;border-top:var(--line-thin);border-bottom:var(--line-thin);display:flex;align-items:center;justify-content:center;padding:30px 0;flex-shrink:0}
.remarks-content{flex-grow:1;font-size:12px;border-top:var(--line-thin);border-bottom:var(--line-thin);display:flex;align-items:center;padding:15px 0}
</style>
</head>
<body>
<div class="page"><h1 class="header-title">請求書</h1><div class="row-container"><div class="col-left"><div class="client-name-box"><span class="client-name">{{CLIENT}}</span><span class="client-honorific">{{TITLE}}</span></div></div><div class="col-right"><div class="meta-list"><div class="meta-row"><span class="meta-label">請求ID</span><span class="meta-value">{{ID}}</span></div><div class="meta-row"><span class="meta-label">請求日</span><span class="meta-value">{{DATE}}</span></div></div></div></div><div class="intro-text">下記の通りご請求申し上げます。</div><div class="middle-section"><div class="amount-container"><div class="amount-row"><span class="amount-label">ご請求金額</span><div class="amount-value font-en">{{TOTAL}}<span class="currency-symbol">円</span></div></div><div class="due-date-row"><span class="due-date-label">お支払い期日</span><span class="due-date-value">{{DUE}}</span></div></div><div class="company-info-wrapper"><div class="company-name">{{COMPANY}}</div><div class="company-person">{{PERSON}}</div><div class="company-details font-en">{{EMAIL}}<br>{{ADDRESS}}</div></div></div><div class="table-container"><table class="details-table"><thead><tr><th class="col-id">明細ID</th><th class="col-name">品目・摘要</th><th class="col-price">単価</th><th class="col-qty">数量</th><th class="col-amount">金額</th></tr></thead><tbody><tr class="item-row"><td class="col-id">{{ITEM1_ID}}</td><td class="col-name">{{ITEM1_NAME}}</td><td class="col-price font-en">{{ITEM1_PRICE}}</td><td class="col-qty font-en">{{ITEM1_QTY}}</td><td class="col-amount font-en">{{ITEM1_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM2_ID}}</td><td class="col-name">{{ITEM2_NAME}}</td><td class="col-price font-en">{{ITEM2_PRICE}}</td><td class="col-qty font-en">{{ITEM2_QTY}}</td><td class="col-amount font-en">{{ITEM2_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM3_ID}}</td><td class="col-name">{{ITEM3_NAME}}</td><td class="col-price font-en">{{ITEM3_PRICE}}</td><td class="col-qty font-en">{{ITEM3_QTY}}</td><td class="col-amount font-en">{{ITEM3_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM4_ID}}</td><td class="col-name">{{ITEM4_NAME}}</td><td class="col-price font-en">{{ITEM4_PRICE}}</td><td class="col-qty font-en">{{ITEM4_QTY}}</td><td class="col-amount font-en">{{ITEM4_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM5_ID}}</td><td class="col-name">{{ITEM5_NAME}}</td><td class="col-price font-en">{{ITEM5_PRICE}}</td><td class="col-qty font-en">{{ITEM5_QTY}}</td><td class="col-amount font-en">{{ITEM5_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM6_ID}}</td><td class="col-name">{{ITEM6_NAME}}</td><td class="col-price font-en">{{ITEM6_PRICE}}</td><td class="col-qty font-en">{{ITEM6_QTY}}</td><td class="col-amount font-en">{{ITEM6_AMT}}</td></tr></tbody></table></div><div class="row-container"><div class="col-left"><div class="bank-info"><div class="bank-title">お振込先</div><p class="bank-note">恐れ入りますが、振込手数料はご負担ください。</p><div class="bank-list"><div class="row"><span class="bank-label">銀行</span>：{{BANK_NAME}}</div><div class="row"><span class="bank-label">支店</span>：{{BANK_BRANCH}}</div><div class="row"><span class="bank-label">預金種別</span>：{{BANK_TYPE}}</div><div class="row"><span class="bank-label">口座番号</span>：<span class="font-en">{{BANK_NUMBER}}</span></div><div class="row"><span class="bank-label">口座名義</span>：{{BANK_HOLDER}}</div></div></div></div><div class="col-right"><div class="totals-box"><div class="total-row"><span class="total-label">小計</span><span class="total-val font-en"><span class="price-num">{{SUBTOTAL}}</span> <span style="font-size:10px;">円</span></span></div><div class="total-row"><span class="total-label">消費税</span><span class="total-val font-en"><span class="price-num">{{TAX}}</span> <span style="font-size:10px;">円</span></span></div><div class="total-row"><span class="total-label">源泉徴収税</span><span class="total-val font-en"><span class="price-num">{{WITHHOLDING}}</span> <span style="font-size:10px;">円</span></span></div><div class="total-row"><span class="total-label">合計</span><span class="total-val font-en"><span class="price-num">{{TOTAL}}</span> <span style="font-size:10px;">円</span></span></div></div></div></div><div class="remarks-section"><div class="remarks-title">備考</div><div class="remarks-content">{{NOTE}}</div></div></div></body></html>`;

const ESTIMATE_TEMPLATE = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>見積書</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{--color-black:#3b3b3b;--color-dark-gray:#333;--color-gray:#555;--color-light-gray:#ddd;--color-bg-gray:#f0f0f0;--color-white:#fff;--font-jp:'Noto Sans JP',sans-serif;--font-en:'Lato',sans-serif;--line-heavy:2px solid var(--color-black);--line-thin:1px solid var(--color-black);--line-dotted:1px dotted #999;--left-col-width:60%;--right-col-width:40%}
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--font-jp);background-color:#555;padding:40px;display:flex;justify-content:center;color:var(--color-black);line-height:1.5}
@page{size:A4;margin:0}.page{background:var(--color-white);width:210mm;min-height:297mm;padding:20mm 20mm;box-shadow:0 4px 20px rgba(0,0,0,0.3);position:relative;display:flex;flex-direction:column}
@media print{body{background:none;padding:0}.page{box-shadow:none;margin:0;width:100%;height:100%}}
.font-en{font-family:var(--font-en)}.text-right{text-align:right}.text-center{text-align:center}.font-bold{font-weight:700}.font-heavy{font-weight:900}
.row-container{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px}.col-left{width:var(--left-col-width)}.col-right{width:var(--right-col-width)}
.header-title{font-size:55px;font-weight:900;margin-bottom:60px;letter-spacing:0.1em}
.client-name-box{border-bottom:var(--line-heavy);padding-bottom:4px;margin-bottom:5px;display:flex;justify-content:space-between;align-items:baseline;width:100%}
.client-name{font-size:22px;font-weight:900}.client-honorific{font-size:22px;font-weight:900}
.meta-list{text-align:right;font-size:10px;font-weight:700}.meta-row{display:flex;justify-content:flex-end;margin-bottom:8px}
.meta-label{width:40px;text-align:left}.meta-value{width:135px;text-align:right;font-family:var(--font-en)}
.intro-text{font-size:12px;margin-bottom:10px}.middle-section{display:flex;justify-content:space-between;align-items:stretch;margin-bottom:30px}
.amount-container{width:var(--left-col-width)}.amount-row{background-color:var(--color-bg-gray);padding:15px 15px;display:flex;justify-content:space-between;align-items:center;border-bottom:var(--line-thin)}
.amount-label{font-size:14px;font-weight:700}.amount-value{font-size:22px;font-weight:900}.currency-symbol{font-size:14px;margin-left:5px}
.due-date-row{background-color:var(--color-bg-gray);padding:10px 15px;display:flex;justify-content:space-between;align-items:center;border-bottom:var(--line-heavy)}
.due-date-label{font-size:14px;font-weight:700}.due-date-value{font-size:14px;font-weight:900;font-family:var(--font-en)}
.company-info-wrapper{width:var(--right-col-width);display:flex;flex-direction:column;justify-content:flex-end;text-align:right}
.company-name{font-size:14px;font-weight:900;letter-spacing:0.1em;margin-bottom:2px}.company-person{font-size:12px;font-weight:700;margin-bottom:8px}.company-details{font-size:10px;line-height:1.6;font-weight:700}
.table-container{margin-bottom:15px}.details-table{width:100%;border-collapse:collapse}
.details-table th{background-color:var(--color-black);color:var(--color-white);font-size:12px;font-weight:700;padding:8px 0;text-align:center;border-right:1px dotted #777}
.details-table th:last-child{border-right:none}
.item-row td{height:40px;border-bottom:var(--line-thin);border-right:var(--line-dotted);font-size:12px;font-weight:700;padding:0 8px;vertical-align:middle;text-align:center !important}
.item-row td:last-child{border-right:none}.item-row:last-child td{border-bottom:var(--line-heavy)}
.col-id{width:10%}.col-name{width:50%}.col-price{width:15%}.col-qty{width:10%}.col-amount{width:15%}
.footer-row{display:flex;justify-content:space-between;align-items:flex-start}.bank-info{font-size:12px;font-weight:700;padding-right:20px}
.bank-title{font-size:14px;font-weight:700;margin-bottom:3px}.bank-note{font-size:12px;margin-bottom:12px}
.bank-list .row{display:flex;margin-bottom:6px}.bank-label{width:4em;text-align-last:justify;margin-right:0%}
.totals-box{width:100%}.total-row{display:flex;justify-content:space-between;padding:9px 10px;border-bottom:var(--line-thin);font-size:12px;font-weight:900;align-items:center}
.total-row:last-child{border-bottom:var(--line-heavy);padding:12px 10px}.total-val{font-family:var(--font-en)}
.price-num{font-size:14px;font-weight:900;letter-spacing:1px}.remarks-section{margin-top:25px;display:flex;align-items:stretch;gap:10px}
.remarks-title{width:70px;font-size:12px;font-weight:900;border-top:var(--line-thin);border-bottom:var(--line-thin);display:flex;align-items:center;justify-content:center;padding:30px 0;flex-shrink:0}
.remarks-content{flex-grow:1;font-size:12px;border-top:var(--line-thin);border-bottom:var(--line-thin);display:flex;align-items:center;padding:15px 0}
</style>
</head>
<body>
<div class="page"><h1 class="header-title">見積書</h1><div class="row-container"><div class="col-left"><div class="client-name-box"><span class="client-name">{{CLIENT}}</span><span class="client-honorific">{{TITLE}}</span></div></div><div class="col-right"><div class="meta-list"><div class="meta-row"><span class="meta-label">見積ID</span><span class="meta-value">{{ID}}</span></div><div class="meta-row"><span class="meta-label">発行日</span><span class="meta-value">{{DATE}}</span></div><div class="meta-row"><span class="meta-label">有効期限</span><span class="meta-value">{{DUE}}</span></div></div></div></div><div class="intro-text">下記の通りお見積り申し上げます。</div><div class="middle-section"><div class="amount-container"><div class="amount-row"><span class="amount-label">お見積り金額</span><div class="amount-value font-en">{{TOTAL}}<span class="currency-symbol">円</span></div></div><div class="due-date-row"><span class="due-date-label">件名</span><span class="due-date-value">{{SUBJECT}}</span></div></div><div class="company-info-wrapper"><div class="company-name">{{COMPANY}}</div><div class="company-person">{{PERSON}}</div><div class="company-details font-en">{{EMAIL}}<br>{{ADDRESS}}</div></div></div><div class="table-container"><table class="details-table"><thead><tr><th class="col-id">明細ID</th><th class="col-name">品目・摘要</th><th class="col-price">単価</th><th class="col-qty">数量</th><th class="col-amount">金額</th></tr></thead><tbody><tr class="item-row"><td class="col-id">{{ITEM1_ID}}</td><td class="col-name">{{ITEM1_NAME}}</td><td class="col-price font-en">{{ITEM1_PRICE}}</td><td class="col-qty font-en">{{ITEM1_QTY}}</td><td class="col-amount font-en">{{ITEM1_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM2_ID}}</td><td class="col-name">{{ITEM2_NAME}}</td><td class="col-price font-en">{{ITEM2_PRICE}}</td><td class="col-qty font-en">{{ITEM2_QTY}}</td><td class="col-amount font-en">{{ITEM2_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM3_ID}}</td><td class="col-name">{{ITEM3_NAME}}</td><td class="col-price font-en">{{ITEM3_PRICE}}</td><td class="col-qty font-en">{{ITEM3_QTY}}</td><td class="col-amount font-en">{{ITEM3_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM4_ID}}</td><td class="col-name">{{ITEM4_NAME}}</td><td class="col-price font-en">{{ITEM4_PRICE}}</td><td class="col-qty font-en">{{ITEM4_QTY}}</td><td class="col-amount font-en">{{ITEM4_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM5_ID}}</td><td class="col-name">{{ITEM5_NAME}}</td><td class="col-price font-en">{{ITEM5_PRICE}}</td><td class="col-qty font-en">{{ITEM5_QTY}}</td><td class="col-amount font-en">{{ITEM5_AMT}}</td></tr><tr class="item-row"><td class="col-id">{{ITEM6_ID}}</td><td class="col-name">{{ITEM6_NAME}}</td><td class="col-price font-en">{{ITEM6_PRICE}}</td><td class="col-qty font-en">{{ITEM6_QTY}}</td><td class="col-amount font-en">{{ITEM6_AMT}}</td></tr></tbody></table></div><div class="row-container"><div class="col-left"></div><div class="col-right"><div class="totals-box"><div class="total-row"><span class="total-label">小計</span><span class="total-val font-en"><span class="price-num">{{SUBTOTAL}}</span> <span style="font-size:10px;">円</span></span></div><div class="total-row"><span class="total-label">消費税</span><span class="total-val font-en"><span class="price-num">{{TAX}}</span> <span style="font-size:10px;">円</span></span></div><div class="total-row"><span class="total-label">源泉徴収税</span><span class="total-val font-en"><span class="price-num">{{WITHHOLDING}}</span> <span style="font-size:10px;">円</span></span></div><div class="total-row"><span class="total-label">合計</span><span class="total-val font-en"><span class="price-num">{{TOTAL}}</span> <span style="font-size:10px;">円</span></span></div></div></div></div><div class="remarks-section"><div class="remarks-title">備考</div><div class="remarks-content">{{NOTE}}</div></div></div></body></html>`;

/* =====================================================================
   UTILITIES
   ===================================================================== */
const formatCurrency = (num) => {
    if (!num && num !== 0) return '';
    return new Intl.NumberFormat('ja-JP').format(num);
};

const formatDateToJP = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
};

const getTodayDateValue = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getOneMonthLater = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const generateHtml = (doc, companyInfo, items, calculations) => {
    let template = doc.type === 'invoice' ? INVOICE_TEMPLATE : ESTIMATE_TEMPLATE;

    const replacements = {
        '{{CLIENT}}': doc.client || ' ',
        '{{TITLE}}': doc.title || '御中',
        '{{ID}}': doc.id,
        '{{DATE}}': formatDateToJP(doc.date) || ' ',
        '{{DUE}}': formatDateToJP(doc.due) || ' ',
        '{{SUBJECT}}': doc.subject || ' ',
        '{{COMPANY}}': companyInfo.name || ' ',
        '{{PERSON}}': companyInfo.person || ' ',
        '{{EMAIL}}': companyInfo.email || ' ',
        '{{ADDRESS}}': companyInfo.address || ' ',
        '{{BANK_NAME}}': companyInfo.bankName || ' ',
        '{{BANK_BRANCH}}': companyInfo.bankBranch || ' ',
        '{{BANK_TYPE}}': companyInfo.bankType || ' ',
        '{{BANK_NUMBER}}': companyInfo.bankNumber || ' ',
        '{{BANK_HOLDER}}': companyInfo.bankHolder || ' ',
        '{{SUBTOTAL}}': formatCurrency(calculations.subtotal),
        '{{TAX}}': formatCurrency(calculations.tax),
        '{{WITHHOLDING}}': formatCurrency(calculations.withholding),
        '{{TOTAL}}': formatCurrency(calculations.total),
        '{{NOTE}}': doc.note ? doc.note.replace(/\n/g, '<br>') : ' '
    };

    Object.keys(replacements).forEach(key => {
        template = template.replace(new RegExp(key, 'g'), replacements[key]);
    });

    // Items (Max 6 rows)
    for (let i = 0; i < 6; i++) {
        const item = items[i] || {};
        template = template.replace(`{{ITEM${i + 1}_ID}}`, item.id || '');
        template = template.replace(`{{ITEM${i + 1}_NAME}}`, item.name || '');
        template = template.replace(`{{ITEM${i + 1}_PRICE}}`, item.price ? formatCurrency(item.price) : '');
        template = template.replace(`{{ITEM${i + 1}_QTY}}`, item.qty || '');
        template = template.replace(`{{ITEM${i + 1}_AMT}}`, (item.price && item.qty) ? formatCurrency(item.price * item.qty) : '');
    }

    return template;
};

/* =====================================================================
   COMPONENTS
   ===================================================================== */
const Button = ({ children, variant = 'primary', icon: Icon, onClick, className = '' }) => {
    const base = "flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all active:scale-95";
    const variants = {
        primary: "bg-[#6E7F8D] text-white hover:bg-[#5b6b78] shadow-sm",
        secondary: "bg-[#F3F4F6] text-[#2C3E50] hover:bg-[#E5E7EB]",
        ghost: "bg-transparent text-[#6E7F8D] hover:bg-[#F3F4F6]",
        danger: "bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA]"
    };

    return (
        <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
            {Icon && <Icon size={20} />}
            {children}
        </button>
    );
};

const Input = ({ label, value, onChange, placeholder, type = "text", className = "", readOnly = false }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        {label && <label className="text-xs font-bold text-[#7F8C8D]">{label}</label>}
        <input
            type={type}
            value={value}
            onChange={readOnly ? undefined : e => onChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`w-full border rounded-lg px-3 py-2 text-[16px] focus:outline-none focus:ring-2 
        ${readOnly
                    ? 'bg-[#F3F4F6] text-[#9CA3AF] border-transparent cursor-default'
                    : 'bg-[#F3F4F6] border-[#E5E7EB] text-[#2C3E50] focus:ring-[#6E7F8D]'
                }`}
        />
    </div>
);

const Select = ({ label, value, onChange, options, className = "" }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        {label && <label className="text-xs font-bold text-[#7F8C8D]">{label}</label>}
        <div className="relative">
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full appearance-none bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#6E7F8D] text-[16px]"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#9CA3AF]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
        </div>
    </div>
);

/* =====================================================================
   VIEW COMPONENTS (Defined Outside App)
   ===================================================================== */

const DashboardView = ({ onCreate }) => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 max-w-4xl mx-auto w-full text-center">
        <div className="mb-12">
            <h1 className="text-4xl font-black text-[#6E7F8D] mb-4 tracking-tight">
                しんぷる帳票
            </h1>
            <p className="text-[#7F8C8D] max-w-lg mx-auto leading-relaxed">
                登録不要。ボタンを選んで入力するだけ。<br />
                美しい請求書・見積書をすぐにPDF化。
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
            <button
                onClick={() => onCreate('invoice')}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-8 bg-white border-2 border-[#E5E7EB] rounded-2xl hover:border-[#6E7F8D] hover:shadow-xl transition-all duration-300"
            >
                <div className="w-20 h-20 bg-[#EFF2F9] rounded-full flex items-center justify-center text-[#6E7F8D] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Receipt size={40} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-bold text-[#6E7F8D]">請求書を作成</span>
                <span className="text-sm text-[#9CA3AF] mt-2 font-medium">Invoice</span>
            </button>

            <button
                onClick={() => onCreate('estimate')}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-8 bg-white border-2 border-[#E5E7EB] rounded-2xl hover:border-[#6E7F8D] hover:shadow-xl transition-all duration-300"
            >
                <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#6E7F8D] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FileText size={40} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-bold text-[#6E7F8D]">見積書を作成</span>
                <span className="text-sm text-[#9CA3AF] mt-2 font-medium">Estimate</span>
            </button>
        </div>

        <div className="mt-16 text-sm text-[#6E7F8D] font-medium opacity-80 flex flex-col items-center gap-1">
            <span>Developed by</span>
            <span>PORIDE / のりのり</span>
        </div>
    </div>
);

const EditorView = ({
    currentDoc,
    setCurrentDoc,
    docItems,
    setDocItems,
    companyInfo,
    setCompanyInfo,
    taxConfig,
    setTaxConfig,
    calculations,
    onPreview,
    onHome
}) => {
    // Add Row
    // Add Row (Unused in current fixed-6-row design)
    // const addItemRow = () => {
    //     if (docItems.length < 6) {
    //         setDocItems([...docItems, { id: String(docItems.length + 1), name: '', price: '', qty: '' }]);
    //     }
    // };

    // Remove Row (Clear data)
    const removeRow = (index) => {
        const newItems = [...docItems];
        newItems[index] = { ...newItems[index], name: '', price: '', qty: '' };
        setDocItems(newItems);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
            {/* Editor Header */}
            <div className="bg-white border-b border-[#E5E7EB] p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={onHome} className="p-2 -ml-2 rounded-full hover:bg-[#F3F4F6] text-[#6E7F8D]">
                        <Home size={20} />
                    </button>
                    <h2 className="font-bold text-[#2C3E50] text-lg">
                        {currentDoc.type === 'invoice' ? '請求書情報の入力' : '見積書情報の入力'}
                    </h2>
                </div>
            </div>

            <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full pb-32">
                {/* Section 1: Basic Info */}
                <section className="mb-8">
                    <h3 className="flex items-center gap-2 text-[#6E7F8D] font-bold text-sm mb-3 px-1">
                        <FileText size={16} /> 基本情報
                    </h3>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E5E7EB]">
                        <div className="mb-6">
                            <Input
                                label="件名 (案件名)"
                                placeholder="例: ホームページ制作費"
                                value={currentDoc.subject}
                                onChange={(v) => setCurrentDoc({ ...currentDoc, subject: v })}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-xs font-bold text-[#7F8C8D] mb-1 block">顧客を選択または入力</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="顧客名を入力または選択"
                                    className="flex-grow w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#6E7F8D] text-[16px]"
                                    value={currentDoc.client}
                                    onChange={(e) => setCurrentDoc({ ...currentDoc, client: e.target.value })}
                                />
                                <Select
                                    className="w-24 shrink-0"
                                    value={currentDoc.title}
                                    onChange={(v) => setCurrentDoc({ ...currentDoc, title: v })}
                                    options={[{ value: '御中', label: '御中' }, { value: '様', label: '様' }]}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Input
                                type="date"
                                label={currentDoc.type === 'invoice' ? '請求日 (発行日)' : '発行日'}
                                value={currentDoc.date}
                                onChange={(v) => setCurrentDoc({ ...currentDoc, date: v })}
                            />
                            <Input
                                type="date"
                                label={currentDoc.type === 'invoice' ? '支払期日' : '有効期限'}
                                value={currentDoc.due}
                                onChange={(v) => setCurrentDoc({ ...currentDoc, due: v })}
                            />
                        </div>
                        <div>
                            <Input label="管理ID" value={currentDoc.id} onChange={(v) => setCurrentDoc({ ...currentDoc, id: v })} />
                        </div>
                    </div>
                </section>

                {/* Section 2: Items */}
                <section className="mb-8">
                    <div className="flex justify-between items-end mb-3 px-1">
                        <h3 className="flex items-center gap-2 text-[#6E7F8D] font-bold text-sm">
                            <CheckCircle size={16} /> 明細入力 (最大6行)
                        </h3>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E5E7EB]">
                        <div className="hidden md:grid grid-cols-12 gap-3 text-xs font-bold text-[#7F8C8D] px-2 mb-3 border-b border-[#E5E7EB] pb-2">
                            <div className="col-span-1 text-center">No.</div>
                            <div className="col-span-5">品目・摘要</div>
                            <div className="col-span-2 text-right">単価</div>
                            <div className="col-span-1 text-right">数量</div>
                            <div className="col-span-2 text-right">小計</div>
                            <div className="col-span-1"></div>
                        </div>

                        <div className="space-y-4 md:space-y-1">
                            {docItems.map((item, index) => {
                                const lineTotal = (parseInt(item.price) || 0) * (parseInt(item.qty) || 0);
                                return (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-[#F9FAFB] p-4 md:p-2 rounded-lg md:rounded-none md:bg-transparent border border-[#E5E7EB] md:border-0 md:border-b md:border-dashed md:last:border-0">
                                        <div className="hidden md:block col-span-1 text-center text-xs text-[#9CA3AF] font-bold">{index + 1}</div>
                                        <div className="md:hidden text-xs font-bold text-[#7F8C8D] mb-1">品目</div>
                                        <div className="col-span-5">
                                            <input
                                                className="w-full bg-transparent border-b border-[#E5E7EB] md:border-0 focus:border-[#6E7F8D] focus:outline-none placeholder-[#9CA3AF]"
                                                placeholder={index === 0 ? "例: ウェブサイト制作費" : "品目名"}
                                                value={item.name}
                                                onChange={(e) => {
                                                    const newItems = [...docItems];
                                                    newItems[index].name = e.target.value;
                                                    setDocItems(newItems);
                                                }}
                                            />
                                        </div>
                                        <div className="flex gap-4 md:contents">
                                            <div className="flex-1 md:col-span-2">
                                                <div className="md:hidden text-xs font-bold text-[#7F8C8D] mb-1">単価</div>
                                                <input
                                                    type="number"
                                                    className="w-full bg-transparent border-b border-[#E5E7EB] md:border-0 focus:border-[#6E7F8D] focus:outline-none text-right font-en"
                                                    placeholder="0"
                                                    value={item.price}
                                                    onChange={(e) => {
                                                        const newItems = [...docItems];
                                                        newItems[index].price = e.target.value;
                                                        setDocItems(newItems);
                                                    }}
                                                />
                                            </div>
                                            <div className="w-20 md:w-auto md:col-span-1">
                                                <div className="md:hidden text-xs font-bold text-[#7F8C8D] mb-1">数量</div>
                                                <input
                                                    type="number"
                                                    className="w-full bg-transparent border-b border-[#E5E7EB] md:border-0 focus:border-[#6E7F8D] focus:outline-none text-right font-en"
                                                    placeholder="0"
                                                    value={item.qty}
                                                    onChange={(e) => {
                                                        const newItems = [...docItems];
                                                        newItems[index].qty = e.target.value;
                                                        setDocItems(newItems);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center md:col-span-2 md:justify-end mt-2 md:mt-0 pt-2 md:pt-0 border-t border-dashed border-[#E5E7EB] md:border-0">
                                            <span className="md:hidden text-xs font-bold text-[#7F8C8D]">小計</span>
                                            <span className="text-[#2C3E50] font-en font-bold">
                                                {lineTotal > 0 ? `¥${formatCurrency(lineTotal)}` : '-'}
                                            </span>
                                        </div>
                                        <div className="absolute top-2 right-2 md:static md:col-span-1 flex justify-end">
                                            <button onClick={() => removeRow(index)} className="text-[#9CA3AF] hover:text-[#DC2626] p-1 rounded hover:bg-[#FEE2E2] transition-colors" title="内容をクリア">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Tax Config */}
                        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-end border-t border-[#E5E7EB] pt-4">
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-bold text-[#7F8C8D]">消費税(10%)</label>
                                <select
                                    className="bg-[#F3F4F6] border border-[#E5E7EB] rounded px-2 py-1 text-sm text-[#2C3E50] focus:outline-none"
                                    value={taxConfig.enableTax ? 'on' : 'off'}
                                    onChange={(e) => setTaxConfig({ ...taxConfig, enableTax: e.target.value === 'on' })}
                                >
                                    <option value="on">あり</option>
                                    <option value="off">なし</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-bold text-[#7F8C8D]">源泉徴収税</label>
                                <select
                                    className="bg-[#F3F4F6] border border-[#E5E7EB] rounded px-2 py-1 text-sm text-[#2C3E50] focus:outline-none"
                                    value={taxConfig.enableWithholding ? 'on' : 'off'}
                                    onChange={(e) => setTaxConfig({ ...taxConfig, enableWithholding: e.target.value === 'on' })}
                                >
                                    <option value="on">あり</option>
                                    <option value="off">なし</option>
                                </select>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex flex-col md:flex-row justify-end items-end gap-2">
                            <div className="w-full md:w-1/2 p-4 bg-[#F9FAFB] rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-[#7F8C8D]">小計</span>
                                    <span className="font-en text-[#2C3E50]">¥{formatCurrency(calculations.subtotal)}</span>
                                </div>
                                {taxConfig.enableTax && (
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-[#7F8C8D]">消費税 (10%)</span>
                                        <span className="font-en text-[#2C3E50]">+ ¥{formatCurrency(calculations.tax)}</span>
                                    </div>
                                )}
                                {taxConfig.enableWithholding && (
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-[#7F8C8D]">源泉徴収税</span>
                                        <span className="font-en text-[#DC2626]">- ¥{formatCurrency(calculations.withholding)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-end border-t border-[#E5E7EB] pt-2 mt-2">
                                    <span className="text-base font-bold text-[#2C3E50]">合計金額</span>
                                    <span className="text-2xl font-black text-[#2C3E50] font-en">
                                        ¥{formatCurrency(calculations.total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Issuer Info (Editable - Integrated from Settings) */}
                <section className="mb-8">
                    <h3 className="flex items-center gap-2 text-[#6E7F8D] font-bold text-sm mb-3 px-1">
                        <Building2 size={16} /> 発行者情報 (自社)
                    </h3>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E5E7EB]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Input label="会社名 / 屋号" placeholder="例: 自社株式会社" value={companyInfo.name} onChange={(v) => setCompanyInfo({ ...companyInfo, name: v })} />
                            <Input label="代表者名" placeholder="例: 代表取締役 田中一郎" value={companyInfo.person} onChange={(v) => setCompanyInfo({ ...companyInfo, person: v })} />
                            <Input label="連絡先 (電話/メール)" placeholder="例: 03-1234-5678 / info@example.com" value={companyInfo.email} onChange={(v) => setCompanyInfo({ ...companyInfo, email: v })} />
                            <Input label="住所" placeholder="例: 東京都千代田区1-1-1" value={companyInfo.address} onChange={(v) => setCompanyInfo({ ...companyInfo, address: v })} />
                        </div>

                        {/* Only show Bank Info for Invoice */}
                        {currentDoc.type === 'invoice' && (
                            <>
                                <h4 className="text-xs font-bold text-[#7F8C8D] mb-3 flex items-center gap-1 border-t border-[#E5E7EB] pt-4">
                                    <CreditCard size={14} /> 振込先口座
                                </h4>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <Input label="銀行名" placeholder="例: 〇〇銀行" value={companyInfo.bankName} onChange={(v) => setCompanyInfo({ ...companyInfo, bankName: v })} />
                                    <Input label="支店名" placeholder="例: 本店" value={companyInfo.bankBranch} onChange={(v) => setCompanyInfo({ ...companyInfo, bankBranch: v })} />
                                </div>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <Select
                                        label="種別"
                                        value={companyInfo.bankType}
                                        onChange={(v) => setCompanyInfo({ ...companyInfo, bankType: v })}
                                        options={[{ value: '普通', label: '普通' }, { value: '当座', label: '当座' }]}
                                    />
                                    <Input label="口座番号" placeholder="1234567" value={companyInfo.bankNumber} onChange={(v) => setCompanyInfo({ ...companyInfo, bankNumber: v })} />
                                </div>
                                <div className="mb-6 w-full">
                                    <Input label="口座名義 (カナ)" placeholder="ジシャ カブシキガイシャ" value={companyInfo.bankHolder} onChange={(v) => setCompanyInfo({ ...companyInfo, bankHolder: v })} />
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Section 4: Remarks */}
                <section className="mb-12">
                    <h3 className="flex items-center gap-2 text-[#6E7F8D] font-bold text-sm mb-3 px-1">
                        <FileText size={16} /> 備考
                    </h3>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E5E7EB]">
                        <textarea
                            className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6E7F8D]"
                            rows={4}
                            placeholder="振込手数料の負担についてや、補足事項など"
                            value={currentDoc.note}
                            onChange={(e) => setCurrentDoc({ ...currentDoc, note: e.target.value })}
                        />
                    </div>
                </section>

                {/* Bottom Action Button */}
                <div className="mt-8 mb-8">
                    <Button onClick={onPreview} className="w-full py-4 bg-[#6E7F8D] text-white hover:bg-[#5b6b78] shadow-md flex items-center justify-center gap-3 text-lg">
                        プレビューへ進む <ArrowRight size={24} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

const PreviewView = ({ currentDoc, companyInfo, docItems, calculations, onEdit }) => {
    const htmlContent = generateHtml(currentDoc, companyInfo, docItems, calculations);
    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;

    const handlePrint = () => {
        // 自社名または担当者名を取得
        const issuerName = companyInfo.name || companyInfo.person || '発行者';
        const fileName = `${currentDoc.subject || '無題'}_${currentDoc.client || '取引先'}${currentDoc.title}_${issuerName}_${calculations.total}円`;

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('ポップアップがブロックされました。');
            return;
        }
        printWindow.document.write(htmlContent);
        printWindow.document.title = fileName;
        printWindow.document.close();
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
        }, 500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#555]">
            <div className="bg-white border-b border-[#E5E7EB] p-4 flex justify-between items-center z-30 shadow-sm sticky top-0">
                <div className="flex items-center gap-2">
                    <button onClick={onEdit} className="p-2 -ml-2 rounded-full hover:bg-[#F3F4F6] text-[#6E7F8D]">
                        <ChevronLeft />
                    </button>
                    <h2 className="font-bold text-[#2C3E50] text-lg">プレビュー確認</h2>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" onClick={onEdit} className="hidden md:flex">
                        <Edit size={18} /> 修正する
                    </Button>
                    <Button onClick={handlePrint} className="px-6 bg-[#6E7F8D] hover:bg-[#5b6b78] text-white">
                        <Download size={20} /> PDFをダウンロード
                    </Button>
                </div>
            </div>

            <div className="flex-1 p-4 md:p-8 overflow-y-auto flex justify-center items-start">
                <div className="relative w-full max-w-[210mm] shadow-2xl bg-white aspect-[210/297] mx-auto mb-20 origin-top">
                    <iframe
                        src={dataUrl}
                        className="absolute inset-0 border-none pointer-events-none"
                        title="preview"
                        style={{
                            width: '210mm',
                            height: '297mm',
                            transformOrigin: 'top left',
                            transform: 'scale(var(--scale-factor))'
                        }}
                        ref={(el) => {
                            if (el && el.parentElement) {
                                const updateScale = () => {
                                    const containerWidth = el.parentElement.offsetWidth;
                                    const a4WidthPx = 793.7;
                                    const scale = containerWidth / a4WidthPx;
                                    el.style.setProperty('--scale-factor', scale);
                                };
                                updateScale();
                                window.addEventListener('resize', updateScale);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

/* =====================================================================
   MAIN APP
   ===================================================================== */

export default function App() {
    const [view, setView] = useState('dashboard');


    const [currentDoc, setCurrentDoc] = useState(null);
    const [docItems, setDocItems] = useState([]);

    const [taxConfig, setTaxConfig] = useState({
        enableTax: true,
        enableWithholding: false
    });

    const [companyInfo, setCompanyInfo] = useState({
        name: '',
        person: '',
        email: '',
        address: '',
        bankName: '',
        bankBranch: '',
        bankType: '普通',
        bankNumber: '',
        bankHolder: ''
    });

    const calculations = useMemo(() => {
        const subtotal = docItems.reduce((acc, item) => acc + (parseInt(item.price || 0) * parseInt(item.qty || 0)), 0);

        // Consumption Tax (10%)
        const tax = taxConfig.enableTax ? Math.floor(subtotal * 0.1) : 0;

        // Withholding Tax Logic
        let withholding = 0;
        if (taxConfig.enableWithholding) {
            if (subtotal <= 1000000) {
                withholding = Math.floor(subtotal * 0.1021);
            } else {
                // (支払金額 - 100万円) * 20.42% + 102,100円
                withholding = Math.floor((subtotal - 1000000) * 0.2042 + 102100);
            }
        }

        const total = subtotal + tax - withholding;
        return { subtotal, tax, withholding, total };
    }, [docItems, taxConfig]);



    const handleCreateNew = (type) => {
        const initialNote = type === 'invoice'
            ? 'この度はご依頼ありがとうございました。\nご査収のほど、よろしくお願い申し上げます。'
            : '事前取り決め以外の追加作業については、別途見積もり対応とさせていただきます。\nお振込手数料は貴社にてご負担いただきますようお願い申し上げます。';

        const newDoc = {
            id: `${type === 'invoice' ? 'INV' : 'EST'}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
            type,
            date: getTodayDateValue(),
            due: getOneMonthLater(),
            client: '',
            title: '御中',
            subject: '',
            note: initialNote,
        };
        setCurrentDoc(newDoc);
        const initialItems = Array(6).fill(null).map((_, i) => ({ id: String(i + 1), name: '', price: '', qty: '' }));
        setDocItems(initialItems);
        setTaxConfig({ enableTax: true, enableWithholding: false });
        setView('edit');
    };

    return (
        <div className="font-[sans-serif]">
            <main className="min-h-screen">
                {view === 'dashboard' && <DashboardView onCreate={handleCreateNew} />}
                {view === 'edit' && currentDoc && (
                    <EditorView
                        currentDoc={currentDoc}
                        setCurrentDoc={setCurrentDoc}
                        docItems={docItems}
                        setDocItems={setDocItems}
                        companyInfo={companyInfo}
                        setCompanyInfo={setCompanyInfo}
                        taxConfig={taxConfig}
                        setTaxConfig={setTaxConfig}
                        calculations={calculations}
                        onPreview={() => setView('preview')}
                        onHome={() => { setView('dashboard'); }}
                    />
                )}
                {view === 'preview' && currentDoc && (
                    <PreviewView
                        currentDoc={currentDoc}
                        companyInfo={companyInfo}
                        docItems={docItems}
                        calculations={calculations}
                        onEdit={() => setView('edit')}
                    />
                )}
            </main>
        </div>
    );
}
