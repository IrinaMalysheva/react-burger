import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import scrollableSectionStyles from './scrollable-section.module.css';
import { SET_TAB_NAME } from '../../services/actions';

function ScrollableSection(props) {
    const sectionElement = useRef(null);
    const dispatch = useDispatch();
    const tabName = useSelector(state => state.general.tabName);
    const tabOffsets = useSelector(state => state.general.tabOffsets);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        sectionElement.current.addEventListener('scroll', handleScroll);
    }, []);

    function handleScroll(event) {
        setScrollTop(sectionElement.current.scrollTop);
    }

    useEffect(() => {
        let activeTab = tabName;
        if (tabOffsets[2]) {
            let distDiff = tabOffsets[2].three;
            let curDiff = Math.abs(distDiff - sectionElement.current.scrollTop);

            tabOffsets.forEach(element => {
                for (let tab in element) {
                    curDiff = Math.abs(element[tab] - sectionElement.current.scrollTop);
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
        <section className={`${scrollableSectionStyles.scrollableSection} ${props.parentClassName}`} ref={sectionElement}>
            {props.children}
        </section>
    )
};

ScrollableSection.propTypes = {
    children: PropTypes.node,
    parentClassName: PropTypes.string
}

export default ScrollableSection;