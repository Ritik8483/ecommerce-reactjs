/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import {
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { io } from "socket.io-client";
// import axios from "axios";
import AddRoomModal from "./AddRoomModal";
import { useGetAllAuthUsersQuery } from "../../redux/api/api";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export default function ChatModal({ chatModal, onHide }) {
  const chatBoxRef = useRef();
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  const [socketId, setSocketId] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  // const [roomsList, setRoomsList] = useState([]);
  // const [usersList, setUsersList] = useState([]);
  const [addRoomModal, setAddRoomModal] = useState(false);
  const userEmail = JSON.parse(localStorage.getItem("webUserEmail"));
  const storedToken = useSelector((state) => state?.authSlice?.userToken);
  const socket = useMemo(() => io("http://127.0.0.1:8080"), []); //both must contain opposite origins

  const { data } = useGetAllAuthUsersQuery({ url: "auth/users" });
  // console.log("data",data);

  const handleRoomChange = (value) => {
    setRoom(value);
    socket.emit("join_room", value); //used to send room id server on backend
  };

  const handleUserChange = (value) => {
    setUser(value);
  };

  //   useEffect(() => {
  //     const scrollAutoHeight =
  //       chatBoxRef?.current?.scrollHeight - chatBoxRef?.current?.clientHeight;
  //     chatBoxRef.current?.scrollTo(0, scrollAutoHeight);
  //   }, [chatMessages?.length]);

  // console.log("room", room?.roomName);
  const handleSubmit = async () => {
    //DATE
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const curentDateFormat = `${day}-${month}-${year}`;

    //TIME
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();
    const curentTimeFormat = `${hours}:${minutes}:${seconds}`;

    //USER
    // const userInfo = usersList?.filter((it) => it.email === userEmail);

    const payload = {
      socketId: socketId,
      message: message,
      sender: storedToken?.name,
      receiver: user?.name,
      date: curentDateFormat,
      time: curentTimeFormat,
    };

    console.log("payload", payload);
    socket.emit("message", payload);
    setMessage("");
  };

  // useEffect(() => {
  //   socket.on("message", (recievedData) => {
  //     console.log("message=>", recievedData); //used for recieving payload which is sent by the user
  //     setChatMessages((prev) => {
  //       console.log("prev", prev);
  //       console.log("recievedData", recievedData);
  //       return [...prev, recievedData];
  //     });
  //   });

  // return () => {
  //   socket.disconnect(); //used for dis-connecting the socket
  // };
  // }, []);

  useEffect(() => {
    console.log("called");
    socket.on("receive-messages", (data) => {
      console.log("receive-messages", data);
      setChatMessages((prev) => [...prev, data]); //it is used to store data in an array
    });
  }, [user, socket]);

  console.log("connected", socket?.id);

  //Whole SOCKET FUNCTIONALITIES for learning
  // useEffect(() => {
  //   //1.connecting socket.io from frontend to backend
  //   socket.on("connect", () => {
  //     console.log("connected", socket.id);
  //   });

  //   // 2.receving message from server to client
  //   socket.on("welcome", (data) => console.log("data", data));

  //   //3.Emitting message from client to server
  //   socket.emit("messages", "Hello 1234567890");

  //   // 4. Recieaving messgae back from backend
  //   socket.on("receive-message", (data) =>
  //     console.log("receive-message", data)
  //   );

  //   return () => {
  //     socket.disconnect(); //used for dis-connecting the socket;unmounted it will be disconnected from frontend and we receave msg on backend
  //   };
  // }, []);

  console.log("socket", socket);
  console.log("chatMessages", chatMessages);

  console.log("userToken", storedToken);
  return (
    <div>
      <Modal
        open={chatModal}
        onClose={onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" padding="10px 0">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Chat
            </Typography>
            <Box display="flex" gap="20px">
              <Button onClick={() => setAddRoomModal(true)} fullWidth>
                Add Room
              </Button>
              {/* <FormControl> */}
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                renderValue={(selected) => {
                  if (selected === "") {
                    return "Select User";
                  } else return selected.name;
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {data?.data?.map((item) => {
                  return (
                    <MenuItem
                      key={item._id}
                      disabled={storedToken?.email === item?.email}
                      onClick={() => handleUserChange(item)}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {/* </FormControl> */}
              {/* <FormControl fullWidth>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={room}
                  renderValue={(selected) => {
                    if (selected === "") {
                      return "Select Room";
                    } else return selected.roomName;
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {roomsList?.map((item) => {
                    return (
                      <MenuItem
                        key={item}
                        // disabled={userEmail === item.email}
                        onClick={() => handleRoomChange(item)}
                      >
                        {item.roomName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
            </Box>
          </Box>
          <Divider />
          <Box
            padding="10px 0"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box ref={chatBoxRef} overflow="auto" height="340px">
              {chatMessages?.map((item) => {
                return (
                  <Box key={item} marginBottom="10px">
                    <Typography
                      fontSize="14px"
                      // textAlign={
                      //   userEmail === item.user.email ? "right" : "left"
                      // }
                      id="modal-modal-description"
                    >
                      {item.message}
                    </Typography>
                    <Typography
                      fontSize="11px"
                      textAlign={
                        userEmail === item.user.email ? "right" : "left"
                      }
                    >
                      {item.user.firstName +
                        "    " +
                        item.date +
                        " " +
                        item.time}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Box display="flex" alignItems="center" width="100%" gap="15px">
              <TextField
                sx={{ width: "100%" }}
                type="text"
                placeholder="Enter text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <TextField
                sx={{ width: "100%" }}
                type="text"
                placeholder="Socket Id"
                value={socketId}
                onChange={(e) => setSocketId(e.target.value)}
              />
              <IconButton>
                <SendIcon sx={{ cursor: "pointer" }} onClick={handleSubmit} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>

      {addRoomModal && (
        <AddRoomModal
          addRoomModal={addRoomModal}
          users={data?.data}
          onHide={() => setAddRoomModal(false)}
        />
      )}
    </div>
  );
}

//SOCKET
// http : one way communication we need to request to get response
// websocket : once conection is established anyone can send response w/o requesting ; both server and client can send data to each other
// emit : is used to send the message and to trigger the event ("event name" + data) [Both sides]
// io.emit("eventName","Hi")
// io.broadcast.emit("eventName","Hi")
// io.to("roomId").emit("eventName","Hi")     => For personal chat
// io.join("roomName").emit("eventName","Hi")     => For making room
// on : is used to print/get the data ("event name" + data) [Both sides]
// io.on("eventName",(data)=>{
//   console.log(data);
// })
