import React from 'react';
import scrollableSectionStyles from './scrollable-section.module.css';

function ScrollableSection(props) {
    return (
        <section className={`${props.className} ${scrollableSectionStyles.scrollableSection}`}>
            {props.children}
        </section>
    )
};

export default ScrollableSection;