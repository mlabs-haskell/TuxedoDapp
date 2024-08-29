import { CircularProgress, Flex } from "@chakra-ui/react";

type LoadingStatusProps = {
  status: "idle" | "pending" | "succeeded" | "failed";
  message?: string;
};

export const LoadingStatus: React.FC<LoadingStatusProps> = ({ status, message }) => {
  return (
    <Flex justifyContent="center" m="4" color={status === "failed" ? "red" : undefined}>
      {status === "pending" && <CircularProgress isIndeterminate color="teal" />}
      {message}
    </Flex>
  );
};