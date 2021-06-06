import { useMediaQuery } from 'react-responsive';

function useScreenSize(screenTypes = ['mobile', 'tablet', 'desktop']) {
    const isMobile = useMediaQuery({ minWidth: '320px' });
    const isTablet = useMediaQuery({ minWidth: '600px' });
    const isDesktop = useMediaQuery({ minWidth: '1024px' });

    if (isMobile) return screenTypes[0];
    else if (isTablet) return screenTypes[1];
    else if (isDesktop) return screenTypes[2];
    else return ''
}

export default useScreenSize;
