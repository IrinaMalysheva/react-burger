import React from 'react';
import PropTypes from 'prop-types';
import scrollableSectionStyles from './scrollable-section.module.css';

function ScrollableSection(props) {
    return (
        <section className={`${props.nameOfClass} ${scrollableSectionStyles.scrollableSection}`}>
            {props.children}
        </section>
    )
};

ScrollableSection.propTypes = {
    children: PropTypes.node,
    nameOfClass: PropTypes.string
}

export default ScrollableSection;