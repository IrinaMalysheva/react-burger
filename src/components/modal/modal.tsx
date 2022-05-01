import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TModal } from '../../utils/types';

const Modal: FC<TModal> = ({ children, header, onClose }) => {
    const modalRoot = document.getElementById("react-modals") as HTMLElement;

    useEffect(() => {
        const closeModal = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
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
                    <CloseIcon onClick={onClose} type="primary" />
                </div>
                {children}
            </div>
        </>,
        modalRoot
    );
};

export default Modal;