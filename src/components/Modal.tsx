export interface ModalProps {
    title: string;
    onClose: () => void;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ title, children, onClose }) => {
    // return (
    //     <div className="modal">
    //         <div className="modal-content">
    //             <div className="modal-header">
    //                 <h2>{title}</h2>
    //                 <span className="close" onClick={onClose}>×</span>
    //             </div>
    //             <div className="modal-body">
    //                 {content}
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="modal-overlay">
            <div className="modal" id="modal">
                <div className="header">
                    <h2>{title}</h2>
                    <button type="button" className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="content">{children}</div>
                <div className="actions">
                    <button type="button" className="toggle-button" onClick={onClose}>
                        Chiudi
                    </button>
                </div>
            </div>
        </div>
    )

    // return (
    //     <div className="modal-overlay">
    //         <div className="modal">
    //             <div className="modal-content">
    //                 <div className="modal-header">
    //                     <h2>{title}</h2>
    //                     <span className="close" onClick={onClose}>×</span>
    //                 </div>
    //                 <div className="modal-body">
    //                     {content}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}