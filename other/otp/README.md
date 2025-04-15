# OpenTripPlanner (OTP)

OpenTripPlanner (OTP) is an open-source platform for multi-modal trip planning and transportation analysis. It allows users to build and query transportation networks, supporting various modes of travel such as walking, biking, driving, and public transit.

## Usage

OTP Version used: OTP version 2.6.0 using Java 22.0.2

### Build Graph
To create a transportation graph from your data, use the following command:
```bash
java -Xmx8G -jar otp.jar --build --save .
```

### Run from Graph
To start the OTP server using a pre-built graph, use:
```bash
java -Xmx2G -jar otp.jar --load .
```

For more details, visit the [OpenTripPlanner documentation](https://www.opentripplanner.org/).
