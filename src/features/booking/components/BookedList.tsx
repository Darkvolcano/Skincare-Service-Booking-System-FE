import { useEffect } from "react";
import {
  Card,
  Tabs,
  Checkbox,
  Typography,
  Row,
  Col,
  message,
  Button,
} from "antd";
import { useBookings } from "../hooks/useGetBooked";
import { useBookingStore } from "../hooks/useBookedStore";
import { useCheckInBooking } from "../hooks/useCheckInBooking";
import { useCheckOutBooking } from "../hooks/useCheckOutBooking";
import { useCancelledBooking } from "../hooks/useCancelledBooking";
import { useDeniedBooking } from "../hooks/useDeniedBooking";
import dayjs from "dayjs";
import { Status } from "../../../enums/status-booking";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const BookingListPage = () => {
  const {
    data: bookedData,
    isLoading: isLoadingBooked,
    error: errorBooked,
    refetch: refetchBooked,
  } = useBookings(Status.BOOKED);

  const {
    data: finishedData,
    isLoading: isLoadingFinished,
    error: errorFinished,
    refetch: refetchFinished,
  } = useBookings(Status.FINISHED);

  const { setBookings } = useBookingStore();
  const { mutate: updateCheckIn } = useCheckInBooking();
  const { mutate: updateCheckOut } = useCheckOutBooking();
  const { mutate: updateCancelled } = useCancelledBooking();
  const { mutate: updateDenied } = useDeniedBooking();

  useEffect(() => {
    if (bookedData && !isLoadingBooked && !errorBooked) {
      setBookings(bookedData);
    }
    if (finishedData && !isLoadingFinished && !errorFinished) {
      setBookings(finishedData);
    }
  }, [
    bookedData,
    isLoadingBooked,
    errorBooked,
    setBookings,
    finishedData,
    isLoadingFinished,
    errorFinished,
  ]);

  const handleCheckin = (bookingId: number) => {
    updateCheckIn(
      { BookingId: bookingId },
      {
        onSuccess: () => {
          message.success("Khách hàng đã check-in thành công!");
          refetchBooked();
        },
        onError: () => {
          message.error("Check-in thất bại, vui lòng thử lại!");
        },
      }
    );
  };

  const handleCheckout = (bookingId: number) => {
    updateCheckOut(
      { BookingId: bookingId },
      {
        onSuccess: () => {
          message.success("Khách hàng đã check-out thành công!");
          refetchFinished();
        },
        onError: () => {
          message.error("Check-out thất bại, vui lòng thử lại!");
        },
      }
    );
  };

  const handleCancelled = (bookingId: number) => {
    updateCancelled(
      { BookingId: bookingId },
      {
        onSuccess: () => {
          message.success("Hủy đặt lịch thành công!");
          refetchBooked();
        },
        onError: () => {
          message.error("Hủy đặt lịch thất bại, vui lòng thử lại");
        },
      }
    );
  };

  const handleDenied = (bookingId: number) => {
    updateDenied(
      { BookingId: bookingId },
      {
        onSuccess: () => {
          message.success("Từ chối thanh toán thành công!");
          refetchBooked();
        },
        onError: () => {
          message.error("Từ chối thành công thất bại, vui lòng thử lại");
        },
      }
    );
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Check-in" key="1">
        <Row gutter={[16, 16]}>
          {bookedData &&
            bookedData.map((booking) => (
              <Col span={8} key={booking.bookingId}>
                <Card>
                  <Row justify="space-between">
                    <Col>
                      <Title level={4}>{booking.customerId}</Title>
                      <Text>Dịch vụ: {booking.serviceName}</Text>
                      <br />
                      <Text>
                        Thời gian: {dayjs(booking.date).format("DD/MM/YYYY")}
                      </Text>
                    </Col>
                    <Col>
                      <Checkbox
                        onChange={() => handleCheckin(booking.bookingId)}
                      >
                        Check-in
                      </Checkbox>
                      <br />
                      <Button
                        onChange={() => handleCancelled(booking.bookingId)}
                      >
                        Hủy đặt lịch
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>
      </TabPane>
      <TabPane tab="Check-out" key="2">
        <Row gutter={[16, 16]}>
          {finishedData &&
            finishedData.map((booking) => (
              <Col span={8} key={booking.bookingId}>
                <Card>
                  <Row justify="space-between">
                    <Col>
                      <Title level={4}>{booking.customerId}</Title>
                      <Text>Dịch vụ: {booking.serviceName}</Text>
                      <br />
                      <Text>
                        Thời gian: {dayjs(booking.date).format("DD/MM/YYYY")}
                      </Text>
                    </Col>
                    <Col>
                      <Checkbox
                        onChange={() => handleCheckout(booking.bookingId)}
                      >
                        Check-out
                      </Checkbox>
                      <br />
                      <Button onChange={() => handleDenied(booking.bookingId)}>
                        Từ chối thanh toán
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default BookingListPage;
