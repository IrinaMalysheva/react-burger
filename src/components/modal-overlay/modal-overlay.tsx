import { FC } from "react";
import modalOverlayStyles from './modal-overlay.module.css';
import { TModalOverlay } from '../../utils/types';

const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {
    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={onClose}>
        </div>
    )
}

export default ModalOverlay;