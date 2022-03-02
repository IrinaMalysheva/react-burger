import React from 'react';
import PropTypes from 'prop-types';
import scrollableSectionStyles from './scrollable-section.module.css';

function ScrollableSection(props) {
    return (
        <section className={`${scrollableSectionStyles.scrollableSection} ${props.parentClassName}`}>
            {props.children}
        </section>
    )
};

ScrollableSection.propTypes = {
    children: PropTypes.node,
    parentClassName: PropTypes.string
}

export default ScrollableSection;