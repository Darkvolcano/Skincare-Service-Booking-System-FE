import { useEffect } from "react";
import { Card, Button, Typography, Row, Col, message, Badge } from "antd";
import { useBookings } from "../hooks/useGetBooked";
import { useBookingStore } from "../hooks/useBookedStore";
import { useFinishedBooking } from "../hooks/useFinishedBooking";
import dayjs from "dayjs";
import { Status } from "../../../enums/status-booking";

const { Title, Text } = Typography;

const BookingListForSkinTherapist = () => {
  const {
    data: checkInData,
    isLoading: isLoadingCheckIn,
    error: errorCheckIn,
    refetch: refetchCheckIn,
  } = useBookings(Status.CHECK_IN);

  const { setBookings } = useBookingStore();
  const { mutate: updateFinished } = useFinishedBooking();

  useEffect(() => {
    if (checkInData && !isLoadingCheckIn && !errorCheckIn) {
      setBookings(checkInData);
    }
  }, [checkInData, isLoadingCheckIn, errorCheckIn, setBookings]);

  const handleFinished = (bookingId: number) => {
    updateFinished(
      { BookingId: bookingId },
      {
        onSuccess: () => {
          message.success("Khách hàng đã sử dụng dịch vụ hoàn thành!");
          refetchCheckIn();
        },
        onError: () => {
          message.error(
            "Hoàn thành sử dụng dịch vụ thất bại, vui lòng thử lại!"
          );
        },
      }
    );
  };

  return (
    <Row gutter={[16, 16]}>
      {checkInData?.map((booking) => (
        <Col span={8} key={booking.bookingId}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Badge status="warning" text="Check In" />
            <Title level={4}>{booking.customerId}</Title>
            <Text>Dịch vụ: {booking.serviceName}</Text>
            <br />
            <Text>Thời gian: {dayjs(booking.date).format("DD/MM/YYYY")}</Text>
            <Row justify="space-between" style={{ marginTop: 16 }}>
              <Button
                type="primary"
                onClick={() => handleFinished(booking.bookingId)}
              >
                Hoàn thành
              </Button>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookingListForSkinTherapist;
