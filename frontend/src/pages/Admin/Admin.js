import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminOperations = () => {
  const [userCampaignDetails, setUserCampaignDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedUserCode, setSelectedUserCode] = useState("");
  const [selectedCampaignCode, setSelectedCampaignCode] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  //tabloda verilerin gösterilmesi için
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/user-campaign-table`)
      .then((response) => response.json())
      .then((json) => setUserCampaignDetails(json))
      .catch((error) => {
        console.log("Error fetching user-campaign-table data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //comboboxta kampanya isimlerini ve kodlarını göstermek için
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/campaigns")
      .then((response) => {
        return response.json();
      })
      .then((data) => setCampaigns(data))
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  //comboboxta kullanıcı isim ve kodlarını göstermek için
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => setUsers(data))
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  //verileri backende göndermek için
  const handleNewRecord = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/api/user-campaign-table`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userCode: selectedUserCode,
          campaignCode: selectedCampaignCode,
        }),
      }
    );
    if (response.ok) {
      alert("Kullanıcı kaydedildi");
      setTimeout(() => {
        window.location.reload(); 
      }, 500);
    }
  };
  //unique kampanya isimleri için
  const uniqueCampaigns = campaigns.reduce((acc, campaign) => {
    const existingCampaign = acc.find(
      (c) => c.campaignCode === campaign.campaignCode
    );
    if (!existingCampaign) {
      acc.push(campaign);
    }
    return acc;
  }, []);

  const sortedUniqueCampaigns = uniqueCampaigns.sort((a, b) =>
    a.campaignName.localeCompare(b.campaignName)
  );

  //unique kullanıcı isimleri için
  const uniqueUsers = users.reduce((acc, user) => {
    const existingUser = acc.find((c) => c.userCode === user.userCode);
    if (!existingUser) {
      acc.push(user);
    }
    return acc;
  }, []);
  const sortedUniqueUsers = uniqueUsers.sort((a, b) =>
    a.companyName.localeCompare(b.companyName)
  );

  //row seçip id'i almak için
  const selectRow = (index) => {
    setSelectedRow(index);
  };

  useEffect(() => {
    if (selectedRow !== null) {
      console.log("Selected rows UserCapaign id:", selectedRow);
    }
  }, [selectedRow]);

  //delete butonu
  const handleDelete = (id) => {
    fetch("http://localhost:8080/api/user-campaign-table", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })
    }).then(() => {
      const updatedCampaignDetails = [...userCampaignDetails].filter(
        (i) => i.id !== selectedRow
      );
      setUserCampaignDetails(updatedCampaignDetails);
      alert("Kullanıcı başarıyla silindi.");
      setTimeout(() => {
        window.location.reload(); 
      }, 500);

    });
  };



  return (
    <div className="user-campaign-page-container">
      <h1>Kullanıcı Kampanya Bilgileri</h1>
      <div className="user-campaign-button-container">
        <button className="user-campaign-button">Yeni Kayıt</button>
        {/*yeni kayıt basınca sil, sile basınca yeni kayıt enable olacak şekilde yaz*/}
        <button
  className="user-campaign-button"
  onClick={() => handleDelete(selectedRow)} // Make sure selectedRow is just an ID
>
  Sil
</button>      </div>
      <div className="user-campaign-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Kullanıcı Kodu</th>
                <th>Kullanıcı İsmi</th>
                <th>Kampanya Kodu</th>
                <th>Kampanya İsmi</th>
              </tr>
            </thead>
            <tbody>
              {userCampaignDetails.map((details, index) => (
                <tr
                  key={details.id}
                  onClick={() => selectRow(details.id)}
                  className={selectedRow === details.id ? "selected" : ""}
                >
                  <td>{details.userCode}</td>
                  <td>{details.companyName}</td>
                  <td>{details.campaignCode}</td>
                  <td>{details.campaignName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <br></br>
      <div className="user-campaign-container">
        <div className="admin-combo-style">
          <select
            value={selectedUserCode}
            onChange={(e) => setSelectedUserCode(e.target.value)}
          >
            <option value="">Kullanıcı</option>
            {sortedUniqueUsers.map((user, index) => (
              <option key={index} value={user.userCode}>
                {user.companyName} - {user.userCode}
              </option>
            ))}
          </select>
          <select
            value={selectedCampaignCode}
            onChange={(e) => setSelectedCampaignCode(e.target.value)}
          >
            <option value="">Kampanya</option>
            {sortedUniqueCampaigns.map((campaign, index) => (
              <option key={index} value={campaign.campaignCode}>
                {campaign.campaignName} - {campaign.campaignCode}
              </option>
            ))}
          </select>
          <button
            className="user-campaign-button"
            onClick={handleNewRecord}
            style={{ marginLeft: "5%", marginBottom: "auto" }}
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOperations;
