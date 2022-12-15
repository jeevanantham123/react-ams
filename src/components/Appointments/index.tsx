import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@common/store";
import { AppointmentModel } from "@common/store/appointments/slice";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import AppointmentModal from "./AddAppointmentModal";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import useAuth from "../../hooks/useAuth";

interface AppointmentsProps {}

export const isDoctor = (data: any) => {
  return data?.roles?.includes(1984) || false;
};

export const isAdmin = (data: any) => {
  return data?.roles?.includes(5150) || false;
};

const Appointments: React.FC<AppointmentsProps> = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const { user } = auth;
  const [modalData, setmodalData] = useState<AppointmentModel>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let apiCalled = false;
  let { data, loading, error } = useSelector(
    (state: RootState) => state.appointment
  );
  useEffect(() => {
    if (!loading && !apiCalled && !isOpen) {
      if (isAdmin(auth)) {
        dispatch({ type: "FETCH_APPOINTMENT_FOR_ADMIN" });
      } else if (isDoctor(auth)) {
        dispatch({ type: "FETCH_APPOINTMENT_FOR_DOC", payload: user });
      } else if (user) {
        dispatch({ type: "FETCH_APPOINTMENT", payload: user });
      }
      dispatch({ type: "FETCH_USER" });
      apiCalled = true;
    }
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h2>error</h2>;
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center mt-40">
        <div className="font-extrabold text-30 mb-20">
          {isDoctor(auth) ? "Patients Appointments" : "Doctor Appointments"}
        </div>
        <TableContainer
          w="80vw"
          className="border rounded-5 p-4"
          display={{ base: "none", md: "block" }}
        >
          <Table variant="striped" colorScheme="pink">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>{isDoctor(auth) ? "Patient" : "Doctor"}</Th>
                <Th>Date and time</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((appointment, index) => {
                return (
                  <Tr key={appointment.id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {isDoctor(auth) ? appointment.user : appointment.doctor}
                    </Td>
                    <Td>
                      {String(new Date(appointment.date)).split("GMT")[0]}
                    </Td>
                    <Td>
                      <EditIcon
                        mr="20px"
                        color="green.500"
                        className="cursor-pointer w-40 h-40"
                        onClick={() => {
                          setmodalData(appointment);
                          onOpen();
                        }}
                      />
                      <DeleteIcon
                        color="red.500"
                        onClick={() =>
                          dispatch({
                            type: "DELETE_APPOINTMENT",
                            payload: {
                              id: appointment.id,
                              user: user,
                              auth: auth,
                            },
                          })
                        }
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <TableCaption>
              <Button
                colorScheme="messenger"
                onClick={() => {
                  setmodalData(undefined);
                  onOpen();
                }}
              >
                Create Appointment
              </Button>
            </TableCaption>
          </Table>
        </TableContainer>
        <div className="flex flex-col gap-20 md:hidden">
          {data?.map((appointment) => {
            return (
              <div
                key={appointment.id}
                className="flex flex-col gap-20 py-20 first:border-t border-b"
              >
                <div className="flex gap-10">
                  {isDoctor(auth) ? "Patient :" : "Doctor:"}{" "}
                  {isDoctor(auth) ? appointment.user : appointment.doctor}
                </div>
                <div>
                  Date : {String(new Date(appointment.date)).split("GMT")[0]}
                </div>
                <div>
                  <EditIcon
                    mr="20px"
                    color="green.500"
                    className="cursor-pointer w-40 h-40"
                    onClick={() => {
                      setmodalData(appointment);
                      onOpen();
                    }}
                  />
                  <DeleteIcon
                    color="red.500"
                    onClick={() =>
                      dispatch({
                        type: "DELETE_APPOINTMENT",
                        payload: {
                          id: appointment.id,
                          user: user,
                          auth: auth,
                        },
                      })
                    }
                  />
                </div>
              </div>
            );
          })}
          <Button
            colorScheme="messenger"
            onClick={() => {
              setmodalData(undefined);
              onOpen();
            }}
          >
            Create Appointment
          </Button>
        </div>
        {isOpen && (
          <AppointmentModal
            isOpen={isOpen}
            onClose={onClose}
            data={modalData}
          />
        )}
      </div>
    );
  }
  return <></>;
};

export default Appointments;
