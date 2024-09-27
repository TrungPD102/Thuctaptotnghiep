// import React from 'react';
// import { Link } from 'react-router-dom';
// import Table from '../components/table/Table';
// import ExportData from '../utils/exportdata';
// import UpdateTrangThaiButton from '../components/buttton/UpdateTrangThaiButton';
// import { useFetchAllDonVangThi } from '../api/donvangthiService';
// import { useFetchAllUsers } from '../api/userService'
// import './style.css';

// const TableHead = [
//     'STT',
//     'Tên Sinh Viên',
//     'Mã Sinh Viên',
//     'SĐT',
//     'Ngày Gửi',
//     'Lý Do Vắng Thi',
//     'Trạng Thái',
//     'Cập Nhật Trạng Thái' // Thêm cột mới cho nút cập nhật trạng thái
// ];



// const Dashboard = () => {
//     const { donVangThiData, loading, error } = useFetchAllDonVangThi();
//     const renderHead = (item, index) => <th key={index}>{item}</th>;

//     const renderBody = (item, index) => (
//         <tr key={index} onClick={() => handleUserClick(donVangThiData)}>
//             <td>{index + 1}</td>
//             {item.User && (
//                 <>
//                     <td>{item.User.FULLNAME}</td>
//                     <td>{item.User.MSV}</td>
//                     <td>{item.User.PHONE}</td>
//                 </>
//             )}
//             <td>{new Date(item.NGAY_GUI).toLocaleDateString('vi-VN')}</td>
//             <td>{item.LY_DO_VANG_THI}</td>
//             <td>{item.TRANG_THAI}</td>
//             <td>
//                 {/* Thêm nút UpdateTrangThaiButton cho mỗi đơn */}
//                 <UpdateTrangThaiButton userId={item.USER_ID} />
//             </td>
//         </tr>
//     );

//     const handleUserClick = () => {
//         console.log(donVangThiData)
//         // Thực hiện hành động tương ứng với sự kiện click
//     };
    
//     if (loading) return <p>Đang tải...</p>;
//     if (error) return <p>Lỗi: {error}</p>;

//     return (
//         <div>
//             <h2 className="page-header">Danh sách xin vắng thi</h2>
//             <div className="row">
//                 <div className="col-12">
//                     <div className="card">
//                         <div className="card__header">
//                             <div className="row">
//                                 <div className="col-10">
//                                     <h3>Danh Sách</h3>
//                                 </div>
//                                 <div id="butt" className="col-2">
//                                     <ExportData />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="card__body">
//                             <Table 
//                                 limit="10"
//                                 headData={TableHead}
//                                 renderHead={(item, index) => renderHead(item, index)}
//                                 bodyData={donVangThiData}
//                                 renderBody={(item, index) => renderBody(item, index)}
                                
//                             />
//                         </div>
//                         <div className="card__footer">
//                             <Link to="/">view all</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
// import React, { useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import Table from '../components/table/Table';
// import ExportData from '../utils/exportdata';
// import UpdateTrangThaiButton from '../components/buttton/UpdateTrangThaiButton';
// import { useFetchAllDonVangThi } from '../api/donvangthiService';
// import { useFetchAllUsers } from '../api/userService';
// import './style.css';

// const TableHead = [
//     'STT',
//     'Tên Sinh Viên',
//     'Mã Sinh Viên',
//     'SĐT',
//     'Ngày Gửi',
//     'Lý Do Vắng Thi',
//     'Trạng Thái',
//     'Cập Nhật Trạng Thái' // Thêm cột mới cho nút cập nhật trạng thái
// ];

// const Dashboard = () => {
//     const { donVangThiData, loading: loadingDonVangThi, error: errorDonVangThi } = useFetchAllDonVangThi();
//     const { users, loading: loadingUsers, error: errorUsers } = useFetchAllUsers();

//     // Kết hợp dữ liệu đơn vắng thi và thông tin người dùng
//     const combinedData = useMemo(() => {
//         return donVangThiData.map((donVangThi) => {
//             const user = users.find(u => u.USER_ID === donVangThi.USER_ID);
//             return { ...donVangThi, User: user };
//         });
//     }, [donVangThiData, users]);

//     const renderHead = (item, index) => <th key={index}>{item}</th>;

//     const renderBody = (item, index) => (
//         <tr key={index} onClick={() => handleUserClick(combinedData)}>
//             <td>{index + 1}</td>                         
//             <td>{item.FULLNAME}</td>
//             <td>{item.MSV}</td>
//             <td>{item.PHONE}</td>                
//             <td>{new Date(item.NGAY_GUI).toLocaleDateString('vi-VN')}</td>
//             <td>{item.LY_DO_VANG_THI}</td>
//             <td>{item.TRANG_THAI}</td>
//             <td>
//                 {/* Thêm nút UpdateTrangThaiButton cho mỗi đơn */}
//                 <UpdateTrangThaiButton userId={item.USER_ID} />
//             </td>
//         </tr>
//     );

//     const handleUserClick = () => {
//         console.log(combinedData);
//         // Thực hiện hành động tương ứng với sự kiện click
//     };

//     // Kiểm tra trạng thái tải và lỗi của cả hai hook
//     if (loadingDonVangThi || loadingUsers) return <p>Đang tải...</p>;
//     if (errorDonVangThi || errorUsers) return <p>Lỗi: {errorDonVangThi || errorUsers}</p>;

//     return (
//         <div>
//             <h2 className="page-header">Danh sách xin vắng thi</h2>
//             <div className="row">
//                 <div className="col-12">
//                     <div className="card">
//                         <div className="card__header">
//                             <div className="row">
//                                 <div className="col-10">
//                                     <h3>Danh Sách</h3>
//                                 </div>
//                                 <div id="butt" className="col-2">
//                                     <ExportData />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="card__body">
//                             <Table 
//                                 limit="10"
//                                 headData={TableHead}
//                                 renderHead={(item, index) => renderHead(item, index)}
//                                 bodyData={combinedData}
//                                 renderBody={(item, index) => renderBody(item, index)}
//                             />
//                         </div>
//                         <div className="card__footer">
//                             <Link to="/">view all</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ExportData from '../utils/exportdata';
import UpdateTrangThaiButton from '../components/buttton/UpdateTrangThaiButton';
import { useFetchAllDonVangThi } from '../api/donvangthiService';
import { useFetchAllUsers, useFetchUserById } from '../api/userService';
import './style.css';

const Dashboard = () => {
    const { donVangThiData, loading: loadingDonVangThi, error: errorDonVangThi } = useFetchAllDonVangThi();
    const { users, loading: loadingUsers, error: errorUsers } = useFetchAllUsers();
    const history = useHistory();
    // Sử dụng useFetchUserById nếu muốn lấy thông tin người dùng cụ thể
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { user: selectedUser, loading: loadingUser, error: errorUser } = useFetchUserById(selectedUserId);

    const combinedData = useMemo(() => {
        if (donVangThiData && users) {
            return donVangThiData.map((donVangThi) => {
                const user = users.find(u => u.id === donVangThi.USER_ID);
                return { ...donVangThi, User: user };
            });
        }
        return [];
    }, [donVangThiData, users]);

    // Function để chọn người dùng khi nhấn vào hàng
    const handleUserClick = (userId) => {
        setSelectedUserId(userId); // Gán userId đã chọn
        history.push(`/donvangthi/${userId}`);
    };

    // Kiểm tra trạng thái tải và lỗi của cả hai hook
    if (loadingDonVangThi || loadingUsers) return <p>Đang tải...</p>;
    if (errorDonVangThi || errorUsers) return <p>Lỗi: {errorDonVangThi || errorUsers}</p>;

    return (
        <div>
            <h2 className="page-header">Danh sách xin vắng thi</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__header">
                            <div className="row">
                                <div className="col-10">
                                    <h3>Danh Sách</h3>
                                </div>
                                <div id="butt" className="col-2">
                                    <ExportData />
                                </div>
                            </div>
                        </div>

                        <div className="card__body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên Sinh Viên</th>
                                        <th>Mã Sinh Viên</th>
                                        <th>SĐT</th>
                                        <th>Ngày Gửi</th>
                                        <th>Lý Do Vắng Thi</th>
                                        <th>Trạng Thái</th>
                                        <th>Cập Nhật Trạng Thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {combinedData.map(({ USER_ID, User, NGAY_GUI, LY_DO_VANG_THI, TRANG_THAI }, i) => (
                                        <tr key={USER_ID} onClick={() => handleUserClick(USER_ID)}>
                                            <td>{i + 1}</td>    
                                            <td>{User.FULLNAME}</td>
                                            <td>{User.MSV}</td>
                                            <td>{User.PHONE}</td>
                                            <td>{new Date(NGAY_GUI).toLocaleDateString('vi-VN')}</td>
                                            <td>{LY_DO_VANG_THI}</td>
                                            <td>{TRANG_THAI}</td>
                                            <td onClick={(event) => event.stopPropagation()}>
                                                {/* Thêm nút UpdateTrangThaiButton cho mỗi đơn */}
                                                <UpdateTrangThaiButton  userId={USER_ID} initialStatus={TRANG_THAI} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Hiển thị thông tin người dùng đã chọn */}
                        {selectedUserId && (
                            <div className="selected-user-info">
                                {loadingUser ? (
                                    <p>Đang tải thông tin người dùng...</p>
                                ) : errorUser ? (
                                    <p>Lỗi khi tải thông tin người dùng: {errorUser}</p>
                                ) : (
                                    selectedUser && (
                                        <div>
                                            <h4>Thông tin người dùng</h4>
                                            <p>Tên: {selectedUser.FULLNAME}</p>
                                            <p>Mã Sinh Viên: {selectedUser.MSV}</p>
                                            <p>SĐT: {selectedUser.PHONE}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        <div className="card__footer">
                            <Link to="/">view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


