This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
=> DB integration is only possible within AWS EC2, so only the web interface can be viewed.

## install library

Please refer to package.json and package-lock.json.

## 클러스터(으)로 인증하는 데 필요한 Amazon DocumentDB 인증 기관(CA) 인증서 다운로드
'''
wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
'''

=> Access is not possible without the corresponding certificate.
