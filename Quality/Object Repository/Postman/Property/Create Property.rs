<?xml version="1.0" encoding="UTF-8"?>
<WebServiceRequestEntity>
   <description></description>
   <name>Create Property</name>
   <tag></tag>
   <elementGuidId>a5f8e5a7-c12f-4e0c-83fc-fe5bc966eb1f</elementGuidId>
   <selectorMethod>BASIC</selectorMethod>
   <smartLocatorEnabled>false</smartLocatorEnabled>
   <useRalativeImagePath>false</useRalativeImagePath>
   <autoUpdateContent>true</autoUpdateContent>
   <connectionTimeout>-1</connectionTimeout>
   <followRedirects>false</followRedirects>
   <httpBody></httpBody>
   <httpBodyContent>{
  &quot;text&quot;: &quot;{\n    \&quot;title\&quot;: \&quot;Beautiful Villa\&quot;,\n    \&quot;description\&quot;: \&quot;A lovely villa with sea view\&quot;,\n    \&quot;price\&quot;: 500000,\n    \&quot;address\&quot;: \&quot;123 Ocean Drive\&quot;,\n    \&quot;type\&quot;: \&quot;villa\&quot;,\n    \&quot;bedrooms\&quot;: 4,\n    \&quot;bathrooms\&quot;: 3,\n    \&quot;area\&quot;: 250\n}&quot;,
  &quot;contentType&quot;: &quot;text/plain&quot;,
  &quot;charset&quot;: &quot;UTF-8&quot;
}</httpBodyContent>
   <httpBodyType>text</httpBodyType>
   <httpHeaderProperties>
      <isSelected>false</isSelected>
      <matchCondition>equals</matchCondition>
      <name>Authorization</name>
      <type>Main</type>
      <value>Bearer ${authToken}</value>
      <webElementGuid>ab0d43bf-ac93-42a5-bd22-acb717d16866</webElementGuid>
   </httpHeaderProperties>
   <katalonVersion>10.4.3</katalonVersion>
   <maxResponseSize>-1</maxResponseSize>
   <migratedVersion>5.4.1</migratedVersion>
   <path></path>
   <restRequestMethod>POST</restRequestMethod>
   <restUrl>${baseUrl}/property</restUrl>
   <serviceType>RESTful</serviceType>
   <soapBody></soapBody>
   <soapHeader></soapHeader>
   <soapRequestMethod></soapRequestMethod>
   <soapServiceEndpoint></soapServiceEndpoint>
   <soapServiceFunction></soapServiceFunction>
   <socketTimeout>-1</socketTimeout>
   <useServiceInfoFromWsdl>true</useServiceInfoFromWsdl>
   <variables>
      <defaultValue>GlobalVariable.baseUrl</defaultValue>
      <description></description>
      <id>ed0a4bd4-6584-4589-9c96-f86d8d2a65f2</id>
      <masked>false</masked>
      <name>baseUrl</name>
   </variables>
   <variables>
      <defaultValue>GlobalVariable.authToken</defaultValue>
      <description></description>
      <id>023d7627-5a0a-403a-abe2-7efdcf5b5c80</id>
      <masked>false</masked>
      <name>authToken</name>
   </variables>
   <wsdlAddress></wsdlAddress>
</WebServiceRequestEntity>
