import { FC } from "react";
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import scrollableSectionStyles from './scrollable-section.module.css';
import { setTabNameAction } from '../../services/actions/generalBurgers';
import { TScrollableSection, TTabOffsettop } from '../../utils/types';

const ScrollableSection: FC<TScrollableSection> = ({ parentClassName, children }) => {
    const sectionElement = useRef<HTMLElement>(null);
    const dispatch = useDispatch();
    const { tabName, tabOffsets } = useSelector(store => store.generalBurgers);
    const [scrollTop, setScrollTop] = useState<number | undefined>(0);

    useEffect(() => {
        sectionElement?.current?.addEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        setScrollTop(sectionElement?.current?.scrollTop);
    }

    const tabOffsetsLength = tabOffsets.length;

    useEffect(() => {
        let activeTab = tabName;
        if (tabOffsetsLength) {
            let sectionElementScrollTop = sectionElement?.current?.scrollTop as number;
            let distDiff = Object.values(tabOffsets[tabOffsetsLength - 1])[0];
            let curDiff = Math.abs(distDiff - sectionElementScrollTop);

            tabOffsets.forEach((element: TTabOffsettop) => {
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
        dispatch(setTabNameAction(activeTab));
    }, [scrollTop]);

    return (
        <section className={`${scrollableSectionStyles.scrollableSection} ${parentClassName}`} ref={sectionElement}>
            {children}
        </section>
    )
};

export default ScrollableSection;