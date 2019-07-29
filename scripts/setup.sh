#!/bin/bash

if yarn ; then # TRY
  yarn global add lerna
  yarn global add typescript@3.4.5
else # CATCH
    echo -e "\x1b[91myarn command is not installed, this script will downloaded for you\x1b[0m"
    curl -o- -L https://yarnpkg.com/install.sh | bash
    yarn global add lerna
    yarn global add typescript@3.4.5
fi