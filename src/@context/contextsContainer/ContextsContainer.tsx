import { ReactNode } from "react";
import { NotificationContextContainer } from "../notificationContent";
import { ServicesContextContainer } from "../servicesContext";
import { BookingContextContainer } from "../bookingContext";
import { MastersContextContainer } from "../mastersContext";
import { LoginContextContainer } from "../loginContext";

type Props = {
  children: ReactNode;
};

const ContextsContainer = ({ children }: Props) => {
  return (
    <LoginContextContainer>
      <NotificationContextContainer>
        <MastersContextContainer>
          <ServicesContextContainer>
            <BookingContextContainer>{children}</BookingContextContainer>
          </ServicesContextContainer>
        </MastersContextContainer>
      </NotificationContextContainer>
    </LoginContextContainer>
  );
};

export default ContextsContainer;
