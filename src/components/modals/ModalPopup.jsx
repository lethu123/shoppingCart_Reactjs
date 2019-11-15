import React from 'react';
import './ModalPopup.scss';

const ModalPopup = (props) => {
    return (
        <div id="DOM" role="dialog" style={{ background: "rgba(0,0,0,0.6)" }} className={props.status ? "show " : "hide "}>
            <div className="modal-dialog">

                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={() => props.Status()}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="imageP" >
                            <img src={`/assets/${props.itemProduct.picture}`} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <p>{props.itemProduct.name}</p>
                        <p>{props.itemProduct.price} $</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ModalPopup

