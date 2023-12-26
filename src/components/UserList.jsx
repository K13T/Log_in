import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-tqlme/endpoint/GET');
      setUserData(response.data);
      setError(null);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      setError('Không thể tải dữ liệu. Vui lòng thử lại sau nha.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const tableCellStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    border: '1px solid black',
    padding: '8px',
  };

  return (
    <div>
      <h2 style={{ fontSize: '2em', fontWeight: 'bold' }}>LIST USER</h2>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleRefresh} disabled={loading}>
          {loading ? 'Đang làm mới...' : 'Làm mới'}
        </button>
        <button onClick={toggleShowPassword} style={{ marginLeft: '10px' }}>
          {showPassword ? 'Ẩn' : 'Hiện'} Mật khẩu
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>STT</th>
            <th style={tableCellStyle}>HỌ TÊN</th>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>GIƠI TINH</th>
            <th style={tableCellStyle}>CÂN NẶNG</th>
            <th style={tableCellStyle}>CHIỀU CAO</th>
            <th style={tableCellStyle}>TUỔI</th>
            <th style={tableCellStyle}>SĐT</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userData).map((username, index) => (
            <tr key={username}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{userData[username].username}</td>
              <td style={tableCellStyle}>{userData[username].password}</td>
              <td style={tableCellStyle}>{userData[username].gender}</td>
              <td style={tableCellStyle}>{userData[username].weight}</td>
              <td style={tableCellStyle}>{userData[username].height}</td>
              <td style={tableCellStyle}>{userData[username].age}</td>
              <td style={tableCellStyle}>{userData[username].phone}</td>
              <td style={tableCellStyle}>
                {showPassword ? (
                  userData[username].password
                ) : (
                  <span style={tableCellStyle} onClick={toggleShowPassword}>
                    ••••••
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
