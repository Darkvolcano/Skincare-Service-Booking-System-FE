import { Card, Col, Row, Typography, Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTherapists } from "../hooks/useGetTherapist";
import { useTherapistStore } from "../hooks/useTherapistStore";
import { InfoOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// const experts = [
//   {
//     id: 1,
//     name: "Nancy Reimer",
//     expertise: "Giáo dục & Kiến thức chăm sóc da",
//     experience:
//       "Hàng chục năm kinh nghiệm và kiến thức chuyên sâu về chăm sóc da.",
//     field: "Giáo dục",
//     degree: "Giám đốc Giáo dục",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     id: 2,
//     name: "Tiffany Medois",
//     expertise: "Tư vấn viên & Chuyên viên thẩm mỹ",
//     experience:
//       "Từng làm nhà báo, nhà sản xuất, nhà làm phim tài liệu và biên tập viên.",
//     field: "Tư vấn",
//     degree: "Chuyên viên Thẩm mỹ Chứng nhận",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     id: 3,
//     name: "Katina Gilmore",
//     expertise: "Điều dưỡng & Thẩm mỹ",
//     experience:
//       "Kết hợp giữa điều dưỡng và thẩm mỹ để mang lại sự chuyên môn cá nhân hóa.",
//     field: "Chăm sóc sức khỏe",
//     degree: "Y tá Chứng nhận (R.N.)",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     id: 4,
//     name: "Bill Levins",
//     expertise: "Giám đốc Tiếp thị",
//     experience:
//       "Mang đến kiến thức thông qua sự am hiểu sâu sắc trong ngành kinh doanh chăm sóc da.",
//     field: "Tiếp thị",
//     degree: "Phó Chủ tịch Tiếp thị",
//     image: "https://via.placeholder.com/150",
//   },
// ];

const SkinTherapistList = () => {
  const navigate = useNavigate();
  const {
    data: therapistData,
    isLoading: isLoadingTherapist,
    error: errorTherapist,
  } = useTherapists();

  const { setTherapists } = useTherapistStore();

  const handleNavigate = (id: number) => {
    navigate(`/Homepage/SkinTherapist/${id}`);
  };

  useEffect(() => {
    if (therapistData && !isLoadingTherapist && !errorTherapist) {
      setTherapists(therapistData);
    }
  }, [therapistData, isLoadingTherapist, errorTherapist, setTherapists]);

  return (
    <div style={{ padding: "20px", backgroundColor: "#FBFEFB" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Chọn chuyên viên trị liệu da cho bạn
      </Title>
      <Row gutter={[16, 16]}>
        {therapistData?.map((therapist) => (
          <Col xs={24} sm={12} md={8} lg={6} key={therapist.skintherapistId}>
            <Card
              hoverable
              style={{ borderRadius: "10px", textAlign: "center" }}
              cover={
                <img
                  alt={therapist.name}
                  src={therapist.image}
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              }
              actions={[
                <Button
                  type="text"
                  icon={<InfoOutlined />}
                  key="wishlist"
                  onClick={() => handleNavigate(therapist.skintherapistId)}
                >
                  Thông tin
                </Button>,
                <Button
                  type="primary"
                  key="book"
                  onClick={() => handleNavigate(therapist.skintherapistId)}
                >
                  Đặt lịch với {therapist.name.split(" ")[0]}
                </Button>,
              ]}
            >
              <Title level={4} style={{ marginBottom: "5px" }}>
                {therapist.name}
              </Title>
              <Text strong>{therapist.expertise}</Text>
              <br />
              <Text type="secondary">Kinh nghiệm: {therapist.experience}</Text>
              <br />
              <Text type="secondary">Bằng cấp: {therapist.degree}</Text>
              {/* <div style={{ marginTop: "15px" }}>
                <Button type="primary" shape="round">
                  Đặt lịch với {therapist.name.split(" ")[0]}
                </Button>
              </div> */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SkinTherapistList;
