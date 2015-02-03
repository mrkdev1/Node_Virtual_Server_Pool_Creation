
Title: Node.js Virtual Server and Pool Creation 

Description: A script to add and delete both Virtual IPs and Pools on a virtual BIG-IQ using node.js.

Note that because node.js uses mostly asynchronous code, this example makes extensive use of callback functions. In contrast to previous iControl REST samples that used synchronous code (written in Python, Ruby, and Perl) this sample does not require the inclusion of explicit 'time delays' in the code to avoid sychronization errors with the BIGIP system. This example reads input files and creates virtual IPs and pools asychronously as fast as allowed by the available system.

To run this example, you will require a virtual environment containing a BIG-IP LTM system on a network that you can access from your computer. You will need to know the management IP for your BIG-IP as well as the IPs for the three pool members you will add to your pool. You will need to install node.js (http://nodejs.org/) and the request module (https://www.npmjs.com/package/request) on your computer to run this example.

You are reading the Readme.txt file. The following files are include with this example. The five JSON files provide input data for the new virtual server and pool. The input can be edited to modify the characteristics of the new virtual server and pool. Copy all these files into the same directory on your computer:

cr7.js		Run this Javascript file in node to try the example.
pool1.json	JSON input file describing the new pool. 
member1.json    JSON input file describing the first pool member. 
member2.json	JSON input file describing the second pool member. Note only 'name' is required.
member3.json	JSON input file describing the third pool member.
vserver.json	JSON input file describing the new virtual server.

Run the command:

node cr7.js

On success, the example adds one new virtual server and one pool containing three members. The example then checks for the presence of these resources on the BIP-IP. It then deletes the resources it has created from the BIG-IP. It writes the following to the standard output.

Adding resource specified in pool1.json to ltm/pool

STATUS: 200


Adding resource specified in member1.json to ltm/pool/~Common~pool_1/members
STATUS: 200


Adding resource specified in member2.json to ltm/pool/~Common~pool_1/members

STATUS: 200


Adding resource specified in member3.json to ltm/pool/~Common~pool_1/members

STATUS: 200


Adding resource specified in vserver.json to ltm/virtual

STATUS: 200
FINISHED CREATING VIRTUAL SERVER AND SERVER POOL



Checking for presence of resource on the BIGIP 

{"name":"vs_1"}



Checking for presence of resource on the BIGIP 

{"name":"10.20.20.3:80"}



Checking for presence of resource on the BIGIP 

{"name":"10.20.20.2:80"}



Checking for presence of resource on the BIGIP 

{"name":"10.20.20.1:80"}



Checking for presence of resource on the BIGIP 

{"name":"pool_1"}



FINISHED CHECKING FOR PRESENCE OF VIRTUAL SERVER AND POOL

Deleting resource: ltm/virtual/~Common~vs_1

STATUS: 200


Deleting resource: ltm/pool/~Common~pool_1/members/~Common~10.20.20.3:80

STATUS: 200


Deleting resource: ltm/pool/~Common~pool_1/members/~Common~10.20.20.2:80
STATUS: 200
Deleting resource: ltm/pool/~Common~pool_1/members/~Common~10.20.20.1:80
STATUS: 200


Deleting resource: ltm/pool/~Common~pool_1
STATUS: 200


FINISHED DELETING VIRTUAL SERVER AND POOL
 
 


