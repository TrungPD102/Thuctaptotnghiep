import React, { useState, useEffect } from 'react';
import { updateDonVangThi } from '../../api/donvangthiService';
import toast from 'react-hot-toast'; // Import thư viện react-hot-toast
import './UpdateTrangThaiButton.css';

const UpdateTrangThaiButton = ({ userId, initialStatus }) => {
    const [trangThai, setTrangThai] = useState(initialStatus);

    useEffect(() => {
        setTrangThai(initialStatus); // Cập nhật trạng thái ban đầu khi có thay đổi
    }, [initialStatus]);

    const handleUpdateTrangThai = async () => {
        let newStatus;
        if (trangThai === 'Duyệt') {
            newStatus = 'Chờ Duyệt';
        } else if (trangThai === 'Chờ Duyệt') {
            newStatus = 'Từ Chối';
        } else {
            newStatus = 'Duyệt';
        }

        try {
            const dataToUpdate = {
                USER_ID: userId,
                TRANG_THAI: newStatus,
            };

            const response = await updateDonVangThi(dataToUpdate);

            if (response.status === 200) {
                setTrangThai(newStatus); // Cập nhật trạng thái mới trong state
                
                // Đợi 1,5 giây trước khi hiển thị thông báo và reload trang
                setTimeout(() => {
                    toast.success('Cập nhật trạng thái thành công!', {
                        style: { background: 'green', color: 'white' }, // Style thông báo
                    });
                    
                    // Load lại trang sau khi hiển thị thông báo
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }, 1500);
                
            } else {
                toast.error('Lỗi khi cập nhật trạng thái!', {
                    style: { background: 'red', color: 'white' }, // Style lỗi
                });
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error.message);
            toast.error('Có lỗi xảy ra!', {
                style: { background: 'red', color: 'white' }, // Style lỗi
            });
        }
    };

    // Thay đổi màu của nút dựa trên trạng thái hiện tại
    const buttonStyle = {
        backgroundColor: trangThai === 'Chờ Duyệt' 
            ? 'orange' 
            : trangThai === 'Từ Chối' 
            ? 'red' 
            : 'green',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div className="update-button-container">
            <button className="update-button" onClick={handleUpdateTrangThai} style={buttonStyle}>
                {trangThai}
            </button>
        </div>
    );
};

export default UpdateTrangThaiButton;