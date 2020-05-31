Shell injection

Where attackers target underlying operatiing system.

child_process module
exec, exceFile, spawn or fork, all these commands execute scripts on OS

Problem is trusting the user to send valid input

For example attacked could send google.com | cat etc/shadow? to see contents of the server's /etc/shadow file containing password information.

Recommendations

Use exeFile instead of exe. exeFile executes the file directly, limiting the surface area for attack. Downside is you lose the ability to run complex commands with piping.

Whitelist variables supplied by the user
i.e `if(host.match(/^[-\.][^a-zA-Z0-9\-\.]/)) { // invalid input }`
