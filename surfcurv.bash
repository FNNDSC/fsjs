#!/bin/bash

G_OS=$(uname)

# "include" the set of common script functions
source common.bash
declare -i Gi_verbose=0

G_SYNOPSIS="

    NAME
        
        surfcurv.bash
        
    SYNOPSIS
    
        surfcurv.bash [-s <'Darwin'|'Linux'> [-v <verbosityLevel>]    	\\
                        -f <surface>                            	\\
                        -c <curv>                                   
                        
    DESCRIPTION
    
        'surfcurv.bash' opens the passed <surface> with <curv> overlay
	in surfcurv.php.
        
        The primary purpose is to provide a CLI mechanism for viewing 
	surfaces and overlays.
"

A_host="checking command line arguments"

EM_host="I couldn't identify the underlying env. Specify either '-s Linux' or '-s Darwin'."

EC_host=10

while getopts v:s:f:c:q: option ; do
    case "$option" 
    in
        v) Gi_verbose=$OPTARG                           ;;
        s) G_STYLE=$OPTARG                              ;;
	f) SURFACE=$(echo $OPTARG | tr ',' ' ')    	;;
	c) CURV=$(echo $OPTARG | tr ',' ' ')       	;;
	\?) synopsis_show ; shut_down 10 ;;
    esac
done

G_OS=$(string_clean $G_OS)
if [[ $G_OS != "Linux" && $G_OS != "Darwin" ]] ; then fatal args;   fi

if [[ $G_OS == "Linux"  ]] ; then OPEN="gnome-open"     ; fi
if [[ $G_OS == "Darwin" ]] ; then OPEN="open"           ; fi

shift $(($OPTIND - 1))
lst_SUBJ=$*

for SURFACE in $SURFACE ; do
    for CURV in $CURV ; do
	echo "Opening surfcurv, using $SURFACE $CURV"
	URL="http://natal.tch.harvard.edu/fsjs/surfcurv.php?surfaceMesh=$SURFACE&overlay=$CURV"
	echo $URL
	$OPEN $URL
    done
    read -p "Hit [ENTER] to continue..."
done


