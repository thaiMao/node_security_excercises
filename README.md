Cross Site Scripting (XSS)

One of if not the most common forms of attack.

Client side. Someone executes his/her own scripts on your page.

The most common XSS attacks are session hikacking and request forgery.

Types of XSS

Reflected - script is reflected off the web server. HTML is contructed using URL params without proper escaping. Attacker has to provide a link to the victim

Stored - script is persisted and executes when rendering the web page.

DOM - client side execution issues

Recommendations

Main aim of XSS is to hijack the user's session by asking for `document.cookie`. Set `HttpOnly` flag on cookies, so scripts running on the page are blocked for accessing that cookie.

Content security policy (CSP)

Use CSP header to specify where scripts should come from. Only whitelisted scripts are executed.

Sanitize input
Avoid putting content:

-   inside HTML comments
-   directly inside a style tag
-   as a tag
-   as an attribute name
-   directly inside a script tag

Sanitize

-   CSS values
-   URL parameters
-   Common quoted HTML attributes i.e <input value="">
-   Inside JS data values in attributes <button onClick="">
-   Data values in script elements

node-esapi

Sanitize user HTML content with Sanitizer npm package

Encode untrusted data inserted into common HTML attributes

i.e ESAPI.encoder().encodeForHTMLAttributes(untrustedData)

Always quote data values to limit possible escape values attackers can use:

i.e

<script>alert('...JS Escaped data here')</script>
<script>x='...JS Escaped data here'</script>

Some JS function can never be safely use untrusted data as input:

window.setInteral("Even is escaped can be XSS here")

Don't let users control CSS background image url.

Escape untrusted data inserted into HTML URL param values.

ESAPI.encoder().encodeForURL(untrustedData);
