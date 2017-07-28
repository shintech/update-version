printf "
#!/usr/bin/env bash

chkarg(){
if [ ! -z \${1+x} ]; then
return 0
else
return 1
fi
}

update_version(){
if chkarg \$1; then
/usr/local/bin/node $(pwd)${directory}/bin/update-version/index.js \$1 \$2
else
printf '\\nplease provide arguments...\\n\$filename \$version\\n\\n'
fi 
}

update_version \$1 \$2
" > $(pwd)${directory}/bin/update-version/script.sh