# vue-i18n-excel

[vue-i18n](https://kazupon.github.io/vue-i18n/) 플러그인의 language `json`파일을 하나의 `excel`파일로 정리하여 번역에 편의를 더할 수 있습니다. 


- **json** to **excel**
- **excel** to **json**

## 몇가지 규칙
1. 디렉토리는 다국어 js파일들과 이를 import한 index.js 파일로 구성되어야 합니다.  
     <img width="187" alt="디렉토리 구조" src="https://user-images.githubusercontent.com/48097396/128636331-20d0f080-28e6-4b84-87e8-a450f6f6ed3f.png">
2. 언어파일 위치는 변경하지 않을 시 기본적으로 'src/lang' 루트를 따릅니다.
3. 기준 언어파일은 변경하지 않을 시 기본적으로 'ko.js' 파일명을 따릅니다.
4. excel로 export 했을 시 json 표현은 'key.value.child-value'형태를 따릅니다.

### 정리 😊

|조건|defualt|변경 가능 여부|
|------|---|---|
|원본파일 위치|src/lang/|No(고도화예정)|
|기준언어 파일명|ko.js|No(고도화예정)|
|json key 표현 구분자|. (ex. 'object.key.child-key')|No(고도화예정)|
|언어파일 구성|export default {..json..}|No|
|파일결과물 위치|'src/result/excel/' 혹은 'src/result/json'|No|

<br>
  
## JSON to EXCEL

<img height="410" alt="원본 js 파일" src="https://user-images.githubusercontent.com/48097396/128636241-6270f096-decc-43e7-989f-653c7f0d9aa1.png"> <img height="410" alt="결과 excel 파일" src="https://user-images.githubusercontent.com/48097396/128636664-8af7aa49-c463-4558-bced-b4e399f68ee8.png">
> 원본 js파일의 형식(좌)으로 구성된 언어 js파일을 취합하여 excel로 생성(우)한 결과.
