import { useState, useEffect } from 'react';
import { WidthBreakpoints } from '../constans/WidthBreakpoints';

export const useScreenSize = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const isXs = screenWidth < WidthBreakpoints.sm;
    const isSm = screenWidth >= WidthBreakpoints.sm && screenWidth < WidthBreakpoints.md;
    const isMd = screenWidth >= WidthBreakpoints.md && screenWidth < WidthBreakpoints.lg;
    const isLg = screenWidth >= WidthBreakpoints.lg && screenWidth < WidthBreakpoints.xl;
    const isXl = screenWidth >= WidthBreakpoints.xl && screenWidth < WidthBreakpoints.xxl;
    const isXxl = screenWidth >= WidthBreakpoints.xxl;

    useEffect(() => {
        console.log('Current screen width:', screenWidth);
        console.log('isMd:', isMd);
        console.log('WidthBreakpoints.md:', WidthBreakpoints.md);
        console.log('WidthBreakpoints.lg:', WidthBreakpoints.lg);
    }, [screenWidth, isMd]);

    return { screenWidth, isXs, isSm, isMd, isLg, isXl, isXxl };
};
