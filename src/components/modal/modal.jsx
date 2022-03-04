import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { Escape_keyCode } from '../../utils/constants';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {
    const modalRoot = document.getElementById("react-modals");
    const { children, header, onClose } = props;

    useEffect(() => {
        const closeModal = (e) => {
            if (e.key === "Escape" || e.keyCode === Escape_keyCode) {
                onClose();
            }
        };
        document.addEventListener("keydown", closeModal);
        return () => {
            document.removeEventListener("keydown", closeModal);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={modalStyles.modal}>
                <div className={modalStyles.modalHeader + " pt-10 pr-10 pl-10"}>
                    <p className="text text_type_main-large">
                        {header}
                    </p>
                    <CloseIcon onClick={onClose} />
                </div>
                {children}
            </div>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default Modal;