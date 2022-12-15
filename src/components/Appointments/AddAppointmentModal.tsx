import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import useAuth from "../../hooks/useAuth";
import DateTimePicker from "react-datetime-picker";
import { RootState } from "@common/store";
import { isAdmin, isDoctor } from ".";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const { user } = auth;
  const tempId = nanoid();
  const [modalData, setModalData] = useState({
    doctor: "",
    date: new Date(),
    id: tempId,
    user: isAdmin(auth) || isDoctor(auth) ? "" : user,
  });
  let { data: userData } = useSelector((state: RootState) => state.user);
  const getDoctors = userData?.filter((userD) => {
    return userD?.roles?.includes(1984);
  });

  const getUsers = userData?.filter((userD) => {
    return userD?.roles?.includes(2001);
  });

  useEffect(() => {
    if (data) {
      setModalData({
        doctor: data.doctor,
        date: new Date(data.date),
        id: data.id,
        user: data.user,
      });
    }
  }, [data]);

  const setDefault = () => {
    setModalData({ doctor: "", date: new Date(), id: tempId, user: "" });
  };

  return (
    <div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          setDefault();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {data ? "Modify Appointment" : "Create your Appointment"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Doctor</FormLabel>
              <Select
                onChange={(e) => {
                  setModalData({ ...modalData, doctor: e.target.value });
                }}
                value={modalData?.doctor}
                placeholder="Select a doctor"
                ref={initialRef}
              >
                {getDoctors?.map((doctorData) => {
                  return (
                    <option value={doctorData?.user}>{doctorData.user}</option>
                  );
                })}
              </Select>
            </FormControl>
            {isAdmin(auth) || isDoctor(auth) ? (
              <FormControl mt={4}>
                <FormLabel>User</FormLabel>
                <Select
                  onChange={(e) => {
                    setModalData({ ...modalData, user: e.target.value });
                  }}
                  value={modalData?.user}
                  placeholder="Select a User"
                >
                  {getUsers?.map((userData) => {
                    return (
                      <option value={userData?.user}>{userData.user}</option>
                    );
                  })}
                </Select>
              </FormControl>
            ) : (
              <FormControl mt={4}>
                <FormLabel>User</FormLabel>
                <Input readOnly value={modalData?.user || user} />
              </FormControl>
            )}

            <FormControl mt={4}>
              <FormLabel>Date & Time</FormLabel>
              <DateTimePicker
                value={modalData?.date}
                onChange={(value: any) => {
                  setModalData({ ...modalData, date: value });
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (data) {
                  if (modalData?.doctor?.length && modalData?.user?.length) {
                    dispatch({
                      type: "PATCH_APPOINTMENT",
                      payload: { data: modalData, user: user, auth: auth },
                    });
                    setDefault();
                    onClose();
                  }
                } else {
                  if (modalData?.doctor?.length && modalData?.user?.length) {
                    dispatch({
                      type: "ADD_APPOINTMENT",
                      payload: { data: modalData, user: user, auth: auth },
                    });
                    setDefault();
                    onClose();
                  }
                }
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setDefault();
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AppointmentModal;
