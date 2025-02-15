// import { useEffect } from "react";
// import {
//   Card,
//   Tabs,
//   Checkbox,
//   Typography,
//   Row,
//   Col,
//   message,
//   Button,
// } from "antd";
// import { useBookings } from "../hooks/useGetBooked";
// import { useBookingStore } from "../hooks/useBookedStore";
// import { useCheckInBooking } from "../hooks/useCheckInBooking";
// import { useCheckOutBooking } from "../hooks/useCheckOutBooking";
// import { useCancelledBooking } from "../hooks/useCancelledBooking";
// import { useDeniedBooking } from "../hooks/useDeniedBooking";
// import dayjs from "dayjs";
// import { Status } from "../../../enums/status-booking";

// const { Title, Text } = Typography;
// const { TabPane } = Tabs;

// const BookingListPage = () => {
//   const {
//     data: bookedData,
//     isLoading: isLoadingBooked,
//     error: errorBooked,
//     refetch: refetchBooked,
//   } = useBookings(Status.BOOKED);

//   const {
//     data: finishedData,
//     isLoading: isLoadingFinished,
//     error: errorFinished,
//     refetch: refetchFinished,
//   } = useBookings(Status.FINISHED);

//   const { setBookings } = useBookingStore();
//   const { mutate: updateCheckIn } = useCheckInBooking();
//   const { mutate: updateCheckOut } = useCheckOutBooking();
//   const { mutate: updateCancelled } = useCancelledBooking();
//   const { mutate: updateDenied } = useDeniedBooking();

//   useEffect(() => {
//     if (bookedData && !isLoadingBooked && !errorBooked) {
//       setBookings(bookedData);
//     }
//     if (finishedData && !isLoadingFinished && !errorFinished) {
//       setBookings(finishedData);
//     }
//   }, [
//     bookedData,
//     isLoadingBooked,
//     errorBooked,
//     setBookings,
//     finishedData,
//     isLoadingFinished,
//     errorFinished,
//   ]);

//   const handleCheckin = (bookingId: number) => {
//     updateCheckIn(
//       { BookingId: bookingId },
//       {
//         onSuccess: () => {
//           message.success("Khách hàng đã check-in thành công!");
//           refetchBooked();
//         },
//         onError: () => {
//           message.error("Check-in thất bại, vui lòng thử lại!");
//         },
//       }
//     );
//   };

//   const handleCheckout = (bookingId: number) => {
//     updateCheckOut(
//       { BookingId: bookingId },
//       {
//         onSuccess: () => {
//           message.success("Khách hàng đã check-out thành công!");
//           refetchFinished();
//         },
//         onError: () => {
//           message.error("Check-out thất bại, vui lòng thử lại!");
//         },
//       }
//     );
//   };

//   const handleCancelled = (bookingId: number) => {
//     updateCancelled(
//       { BookingId: bookingId },
//       {
//         onSuccess: () => {
//           message.success("Hủy đặt lịch thành công!");
//           refetchBooked();
//         },
//         onError: () => {
//           message.error("Hủy đặt lịch thất bại, vui lòng thử lại");
//         },
//       }
//     );
//   };

//   const handleDenied = (bookingId: number) => {
//     updateDenied(
//       { BookingId: bookingId },
//       {
//         onSuccess: () => {
//           message.success("Từ chối thanh toán thành công!");
//           refetchBooked();
//         },
//         onError: () => {
//           message.error("Từ chối thành công thất bại, vui lòng thử lại");
//         },
//       }
//     );
//   };

//   return (
//     <Tabs defaultActiveKey="1">
//       <TabPane tab="Check-in" key="1">
//         <Row gutter={[16, 16]}>
//           {bookedData &&
//             bookedData.map((booking) => (
//               <Col span={8} key={booking.bookingId}>
//                 <Card>
//                   <Row justify="space-between">
//                     <Col>
//                       <Title level={4}>{booking.customerId}</Title>
//                       <Text>Dịch vụ: {booking.serviceName}</Text>
//                       <br />
//                       <Text>
//                         Thời gian: {dayjs(booking.date).format("DD/MM/YYYY")}
//                       </Text>
//                     </Col>
//                     <Col>
//                       <Checkbox
//                         onChange={() => handleCheckin(booking.bookingId)}
//                       >
//                         Check-in
//                       </Checkbox>
//                       <br />
//                       <Button
//                         onChange={() => handleCancelled(booking.bookingId)}
//                       >
//                         Hủy đặt lịch
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Card>
//               </Col>
//             ))}
//         </Row>
//       </TabPane>
//       <TabPane tab="Check-out" key="2">
//         <Row gutter={[16, 16]}>
//           {finishedData &&
//             finishedData.map((booking) => (
//               <Col span={8} key={booking.bookingId}>
//                 <Card>
//                   <Row justify="space-between">
//                     <Col>
//                       <Title level={4}>{booking.customerId}</Title>
//                       <Text>Dịch vụ: {booking.serviceName}</Text>
//                       <br />
//                       <Text>
//                         Thời gian: {dayjs(booking.date).format("DD/MM/YYYY")}
//                       </Text>
//                     </Col>
//                     <Col>
//                       <Checkbox
//                         onChange={() => handleCheckout(booking.bookingId)}
//                       >
//                         Check-out
//                       </Checkbox>
//                       <br />
//                       <Button onChange={() => handleDenied(booking.bookingId)}>
//                         Từ chối thanh toán
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Card>
//               </Col>
//             ))}
//         </Row>
//       </TabPane>
//     </Tabs>
//   );
// };

// export default BookingListPage;
import { useEffect } from "react";
import { Card, Tabs, Button, Typography, Row, Col, message, Badge } from "antd";
import { useBookings } from "../hooks/useGetBooked";
import { useBookingStore } from "../hooks/useBookedStore";
import { useCheckInBooking } from "../hooks/useCheckInBooking";
import { useCompletedBooking } from "../hooks/useCompletedBooking";
import { useCancelledBooking } from "../hooks/useCancelledBooking";
import { useDeniedBooking } from "../hooks/useDeniedBooking";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Status } from "../../../enums/status-booking";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const BookingListForStaff = () => {
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
  const { mutate: updateCompleted } = useCompletedBooking();
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

  const handleCompleted = (bookingId: number) => {
    updateCompleted(
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
          refetchFinished();
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
          {bookedData?.map((booking) => (
            <Col span={8} key={booking.bookingId}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Badge status="processing" text="Booked" />
                <Title level={4}>{booking.customerId}</Title>
                <Text>Dịch vụ: {booking.serviceName}</Text>
                <br />
                <Text>
                  Thời gian: {dayjs(booking.date).format("DD/MM/YYYY")}
                </Text>
                <Row justify="space-between" style={{ marginTop: 16 }}>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleCheckin(booking.bookingId)}
                  >
                    Check-in
                  </Button>
                  <Button
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleCancelled(booking.bookingId)}
                  >
                    Hủy
                  </Button>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </TabPane>
      <TabPane tab="Check-out" key="2">
        <Row gutter={[16, 16]}>
          {finishedData?.map((booking) => (
            <Col span={8} key={booking.bookingId}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Badge status="success" text="Finished" />
                <Title level={4}>{booking.customerId}</Title>
                <Text>Dịch vụ: {booking.serviceName}</Text>
                <br />
                <Text>
                  Thời gian: {dayjs(booking.date).format("DD/MM/YYYY")}
                </Text>
                <Row justify="space-between" style={{ marginTop: 16 }}>
                  <Button
                    type="default"
                    onClick={() => handleCompleted(booking.bookingId)}
                  >
                    Check-out
                  </Button>
                  <Button
                    danger
                    icon={<PayCircleOutlined />}
                    onClick={() => handleDenied(booking.bookingId)}
                  >
                    Không thanh toán
                  </Button>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default BookingListForStaff;
