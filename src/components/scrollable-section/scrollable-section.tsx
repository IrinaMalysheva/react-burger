import { FC } from "react";
import { useEffect, useRef, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import scrollableSectionStyles from './scrollable-section.module.css';
import { SET_TAB_NAME } from '../../services/actions';
import { TScrollableSection } from '../../utils/types';

const ScrollableSection: FC<TScrollableSection> = ({ parentClassName, children }) => {
    const sectionElement = useRef<HTMLElement>(null);
    const dispatch = useDispatch();
    const tabName = useSelector((store: RootStateOrAny) => store.general.tabName);
    const tabOffsets = useSelector((store: RootStateOrAny) => store.general.tabOffsets);
    const [scrollTop, setScrollTop] = useState<number | undefined>(0);

    useEffect(() => {
        sectionElement?.current?.addEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        setScrollTop(sectionElement?.current?.scrollTop);
    }

    useEffect(() => {
        let activeTab = tabName;
        if (tabOffsets[2]) {
            let distDiff = tabOffsets[2].three;
            let sectionElementScrollTop = sectionElement?.current?.scrollTop as number;
            let curDiff = Math.abs(distDiff - sectionElementScrollTop);

            tabOffsets.forEach((element: number[]) => {
                for (let tab in element) {
                    sectionElementScrollTop = sectionElement?.current?.scrollTop as number;
                    curDiff = Math.abs(element[tab] - sectionElementScrollTop);
                    if (curDiff < distDiff) {
                        distDiff = curDiff;
                        activeTab = tab;
                    }
                }
            });
        }
        dispatch({
            type: SET_TAB_NAME,
            tabname: activeTab
        });
    }, [scrollTop]);

    return (
        <section className={`${scrollableSectionStyles.scrollableSection} ${parentClassName}`} ref={sectionElement}>
            {children}
        </section>
    )
};

export default ScrollableSection;