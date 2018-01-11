"use strict";
// Mimic Wordpress html formatting
Object.defineProperty(exports, "__esModule", { value: true });
function preg_replace(pattern, target, text) {
    return text.replace(new RegExp(pattern, 'g'), target);
}
function wpautop(html, br) {
    if (br === void 0) { br = true; }
    if (html.trim() === '')
        return '';
    html = html + "\n";
    html = preg_replace('|<br\s*/?>\s*<br\s*/?>|', "\n\n", html);
    var $allblocks = '(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)';
    // Add a double line break above block-level opening tags.
    html = preg_replace('!(<' + $allblocks + '[\s/>])!', "\n\n$1", html);
    // Add a double line break below block-level closing tags.
    html = preg_replace('!(</' + $allblocks + '>)!', "$1\n\n", html);
    // Standardize newline characters to "\n".
    html = preg_replace("\r\n|\r", "\n", html);
}
exports.wpautop = wpautop;
function wpautop(html, $br) {
    if ($br === void 0) { $br = true; }
    447;
    476; // Change multiple <br>s into two line breaks, which will turn into paragraphs.
    477;
    478;
    480;
    486;
    489;
    490; // Find newlines in all elements and add placeholders.
    491;
    html = wp_replace_in_html_tags(html, array("\n", " <!-- wpnl --> "));
    492;
    493; // Collapse line breaks before and after <option> elements so they don't get autop'd.
    494;
    if (strpos(html, '<option') !== false) {
        495;
        html = preg_replace('|\s*<option|', '<option', html);
        496;
        html = preg_replace('|</option>\s*|', '</option>', html);
        497;
    }
    498;
    525; // Remove more than two contiguous line breaks.
    526;
    html = preg_replace("/\n\n+/", "\n\n", html);
    527;
    528; // Split up the contents into an array of strings, separated by double line breaks.
    529;
    htmls = preg_split('/\n\s*\n/', html, -1, PREG_SPLIT_NO_EMPTY);
    530;
    531; // Reset html prior to rebuilding.
    532;
    html = '';
    533;
    534; // Rebuild the content as a string, wrapping every bit with a <p>.
    535;
    foreach(htmls);
    {
        536;
        html. = '<p>'.trim($tinkle, "\n").;
        "</p>\n";
        537;
    }
    538;
    539; // Under certain strange conditions it could create a P of entirely whitespace.
    540;
    html = preg_replace('|<p>\s*</p>|', '', html);
    541;
    542; // Add a closing <p> inside <div>, <address>, or <form> tag if missing.
    543;
    html = preg_replace('!<p>([^<]+)</(div|address|form)>!', "<p>$1</p></$2>", html);
    544;
    545; // If an opening or closing block element tag is wrapped in a <p>, unwrap it.
    546;
    html = preg_replace('!<p>\s*(</?'.$allblocks., '[^>]*>)\s*</p>!', "$1", html);
    547;
    548; // In some cases <li> may get wrapped in <p>, fix them.
    549;
    html = preg_replace("|<p>(<li.+?)</p>|", "$1", html);
    550;
    551; // If a <blockquote> is wrapped with a <p>, move it inside the <blockquote>.
    552;
    html = preg_replace('|<p><blockquote([^>]*)>|i', "<blockquote$1><p>", html);
    553;
    html = str_replace('</blockquote></p>', '</p></blockquote>', html);
    554;
    555; // If an opening or closing block element tag is preceded by an opening <p> tag, remove it.
    556;
    html = preg_replace('!<p>\s*(</?'.$allblocks., '[^>]*>)!', "$1", html);
    557;
    558; // If an opening or closing block element tag is followed by a closing <p> tag, remove it.
    559;
    html = preg_replace('!(</?'.$allblocks., '[^>]*>)\s*</p>!', "$1", html);
    560;
    561; // Optionally insert line breaks.
    562;
    if ($br) {
        563; // Replace newlines that shouldn't be touched with a placeholder.
        564;
        html = preg_replace_callback('/<(script|style).*?<\/\\1>/s', '_autop_newline_preservation_helper', html);
        565;
        566; // Normalize <br>
        567;
        html = str_replace(array('<br>', '<br/>'), '<br />', html);
        568;
        569; // Replace any new line characters that aren't preceded by a <br /> with a <br />.
        570;
        html = preg_replace('|(?<!<br />)\s*\n|', "<br />\n", html);
        571;
        572; // Replace newline placeholders with newlines.
        573;
        html = str_replace('<WPPreserveNewline />', "\n", html);
        574;
    }
    575;
    576; // If a <br /> tag is after an opening or closing block tag, remove it.
    577;
    html = preg_replace('!(</?'.$allblocks., '[^>]*>)\s*<br />!', "$1", html);
    578;
    579; // If a <br /> tag is before a subset of opening or closing block tags, remove it.
    580;
    html = preg_replace('!<br />(\s*</?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)!', '$1', html);
    581;
    html = preg_replace("|\n</p>$|", '</p>', html);
    582;
    583; // Replace placeholder <pre> tags with their original content.
    584;
    if (!empty($pre_tags))
        585;
    html = str_replace(array_keys($pre_tags), array_values($pre_tags), html);
    586;
    587; // Restore newlines in all elements.
    588;
    if (false !== strpos(html, '<!-- wpnl -->')) {
        589;
        html = str_replace(array(' <!-- wpnl --> ', '<!-- wpnl -->'), "\n", html);
        590;
    }
    591;
    592;
    return html;
    593;
}
//# sourceMappingURL=formatting.js.map