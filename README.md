AWS에서 VPC와 S3 저장소를 생성함.

생성된 VPC를 통해서 DocumentDB와 EC2를 생성함. => 같은 VPC를 통해 만들었기 때문에 EC2내에서 DocumentDB에 접근 가능하다. (DocumentDB는 비정형데이터를 저장하기 위해 key-value쌍으로 저장하는 형식이다.(aws에서 사용하는 DocumentDB는 mongoDB이지만 해당 aws 계정 및 권한을 부여받는 곳에서만 접근이 가능하다.))

생성된 S3에 필수 데이터 저장
![S3에 저장된 이미지](https://github.com/user-attachments/assets/85710a24-ed5e-4b79-b8a6-8266b18ca939)

생성된 DocumentDB에 필수 데이터 삽입
![aws documentDB를 통해 저장해놓은 것](https://github.com/user-attachments/assets/c9f20188-e888-4fc5-b8ab-04de2669ec51)

생성된 EC2의 상태 (퍼블릭 주소가 공개되어있지만, 어차피 중지하면 바뀌기 때문에 그냥 공개하였다.)
![EC2 인스턴스 상태](https://github.com/user-attachments/assets/654fad64-7c7b-4348-b46c-4c6057d75538)

이러한 과정을 통해 웹페이지 접속한 결과
![웹페이지 접속](https://github.com/user-attachments/assets/96297335-09fb-49c3-8199-c505c43e9e0c)

검색을 실행한 결과
![검색 완료 상태](https://github.com/user-attachments/assets/69d98891-67df-47c7-9b3d-0289cf9a3700)

검색하는 과정을 보여주는 이미지
![EC2에서 보이는 과정들](https://github.com/user-attachments/assets/f943c18e-d2eb-4a8a-afbf-b7b7b033afc7)
