import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { Escape_keyCode } from '../../utils/constants';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CLOSE_MODAL } from '../../services/actions';

function Modal(props) {
    const modalRoot = document.getElementById("react-modals");
    const { children, header } = props;

    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.general.isModalOpen);

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
    }, [isModalOpen]);

    const onClose = () => {
        dispatch({type: CLOSE_MODAL});
    };

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
    header: PropTypes.string
}

export default Modal;