/*
 *
 *                  xxxxxxx      xxxxxxx
 *                   x:::::x    x:::::x
 *                    x:::::x  x:::::x
 *                     x:::::xx:::::x
 *                      x::::::::::x
 *                       x::::::::x
 *                       x::::::::x
 *                      x::::::::::x
 *                     x:::::xx:::::x
 *                    x:::::x  x:::::x
 *                   x:::::x    x:::::x
 *              THE xxxxxxx      xxxxxxx TOOLKIT
 *
 *                  http://www.goXTK.com
 *
 * Copyright (c) 2012 The X Toolkit Developers <dev@goXTK.com>
 *
 *    The X Toolkit (XTK) is licensed under the MIT License:
 *      http://www.opensource.org/licenses/mit-license.php
 *
 * NAME
 * 
 *     misc_maths.js
 * 
 * DESCRIPTION
 * 
 * This file defines some 'misc' math-based functions for operating on
 * typically array-ordered data.
 *  
 *    
 */

// A fast stats calculator
stats_calc = function(a){
    var r = {
            length:     0,
            mean:       0,
            variance:   0,
            deviation:  0,
            prod:       1,
            sum:        0,
            min:        0,
            minIndex:   0,
            max:        0,
            maxIndex:   0,
            negCount:   0,
            zeroCount:  0,
            posCount:   0
            };
    var t = a.length;
    r.length    = t;
    for(var m = 0, p = 1, s = 0, l = t; l--; l>=0) {
        s += a[l];
        p *= a[l];
        if(a[l]<0) r.negCount++;
        if(a[l]==0) r.zeroCount++;
        if(a[l]>0) r.posCount++;
        if(r.min >= a[l]) {
            r.min       = a[l];
            r.minIndex  = l;
        }
        if(r.max <= a[l]) {
            r.max       = a[l];
            r.maxIndex  = l;
        }
    };
    r.prod      = p;
    r.sum       = s;
    for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
    return r.deviation = Math.sqrt(r.variance = s / t), r;
};
