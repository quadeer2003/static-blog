---
title: "CN LAB"
date: 2023-11-10T11:20:05+05:30
draft: false
---
## Program-1 : Network Command Explanation

* `tcpdump`

`tcpdump` is a packet analyzer tool that allows you to capture and analyze network traffic. You can adjust the interface and packet count as needed for your specific use case.

* `netstat`

`netstat` is a command-line utility for displaying network statistics, including open ports and active network connections. The command `netstat -tuln` shows listening TCP and UDP ports.

* `ifconfig`

`ifconfig` is used to display and configure network interface parameters, including IP addresses, netmasks, and more. It provides information about the network interfaces on your system.

* `nslookup`

`nslookup` is a network utility for performing DNS (Domain Name System) lookups. In the provided example, it performs a DNS lookup for 'example.com', returning information about the domain's IP addresses.

* FTP

FTP *(File Transfer Protocol) is a network protocol used for transferring files between a client and a server. To interact with FTP programmatically, you should use dedicated FTP client libraries in C, as the command-line `ftp` client may not be suitable for automation.

* TELNET

T*ELNET is a network protocol that allows terminal access to remote systems. To interact with TELNET servers programmatically, you'll need to use a TELNET library or API, as it's not straightforward to automate using a command-line program.

* `traceroute`

`traceroute` is a network diagnostic tool used to trace the route that packets take from your computer to a destination host (e.g., 'example.com'). It displays a list of intermediate routers and their response times.

Please note that some of these services/commands may require additional configuration, and some may not be available on all systems. The specific options and usage may vary depending on your operating system and network setup.

{{< alert >}}
 I’ve tried making a program demonstrating all these commands
{{< /alert >}}
```c
// Program containing all commands in switch 
#include <stdio.h>
#include <stdlib.h>

int main() {
    int choice;
    
    while (1) {
        printf("Select an option:\n");
        printf("1. Run tcpdump\n");
        printf("2. Run netstat\n");
        printf("3. Run ifconfig\n");
        printf("4. Run nslookup\n");
        printf("5. Run FTP\n");
        printf("6. Run TELNET\n");
        printf("7. Run traceroute\n");
        printf("8. Exit\n");

        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                system("tcpdump -i eth0"); // Replace 'eth0' with your network interface
                break;
            case 2:
                system("netstat -tuln");
                break;
            case 3:
                system("ifconfig");
                break;
            case 4:
                printf("Enter the hostname to look up: ");
                char hostname[256];
                scanf("%s", hostname);
                char nslookupCommand[256];
                sprintf(nslookupCommand, "nslookup %s", hostname);
                system(nslookupCommand);
                break;
            case 5:
                system("ftp"); // This will start an interactive FTP session
                break;
            case 6:
                system("telnet"); // This will start an interactive TELNET session
                break;
            case 7:
                printf("Enter the destination IP or hostname for traceroute: ");
                char dest[256];
                scanf("%s", dest);
                char tracerouteCommand[256];
                sprintf(tracerouteCommand, "traceroute %s", dest);
                system(tracerouteCommand);
                break;
            case 8:
                exit(0);
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
```

## Program-2.1 : UDP-client
```c

//program to implmemt udp
#include<stdio.h>
#include<stdlib.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<sys/types.h>
#include<string.h>
main(int argc, char * argv[])
{
	struct sockaddr_in s;
	int rval,sockid,slen;
	char m1[20],m2[20];
	system("clear");
	if(argc<3)
	{
		printf("\n USAGE : %s IP_Address port \n",argv[0]);
		exit(1);
	}
	sockid=socket(AF_INET,SOCK_DGRAM,0);
	if(sockid ==-1)
	{
		perror("SOCK-CRE-ERR:");
		exit(1);
	}
	s.sin_family=AF_INET;
	s.sin_addr.s_addr=inet_addr(argv[1]);
	s.sin_port=htons(atoi(argv[2]));
	printf("\n 	ENTER THE REQUEST MESSAGE ::");
	scanf("%s",m1);
	slen=sizeof(s);
	rval=sendto(sockid,m1,sizeof(m1),0,(struct sockaddr *)&s,slen);
	if(rval==-1)
	{
		perror("MSG-SEND-ERR:");
		exit(1);
	}
	printf("\n message sent sucessfully \n");
	strncpy(m2," ",20);
	rval=recvfrom(sockid,m2,sizeof(m2),0,(struct sockaddr *)&s,&slen);
	if(rval==-1)
	{
		perror("MSG-RCV-ERR:");
		exit(1);
	}
	printf("\n message received is %s \n",m2);
	close(sockid);
}
```
## Program-2.2 : UDP-Server
```c
#include<stdio.h>

#include<stdlib.h>

#include<sys/socket.h>
#include<netinet/in.h>
#include<sys/types.h>
#include<string.h>

int main(int argc, char * argv[]) {
	struct sockaddr_in s,c;
    	int rval, sockid, clen;
    	char buffer[20];
    	system("clear");
    	if (argc < 3) {
      		printf("\nUSAGE : %s IP-Address Port#\n", argv[0]);
      		exit(1);
    	}
    	sockid = socket(AF_INET, SOCK_DGRAM, 0);
    	if (sockid == -1) {
    		perror("SOCK-CRE-ERR:");
      		exit(1);
    	}
    	s.sin_family = AF_INET;
    	s.sin_addr.s_addr = inet_addr(argv[1]);
    	s.sin_port = htons(atoi(argv[2]));
    	printf("\nsocket created : \n");
    	rval = bind(sockid, (struct sockaddr *)&s, sizeof(s));
    	if (rval == -1) {
      		perror("BIND-ERR");
      		close(sockid);
		exit(1);
	}
	
	printf("socket binded\n");
	clen=sizeof(c);
	rval=recvfrom(sockid,buffer,sizeof(buffer),0,(struct sockaddr*)&c,&clen);
	if(rval==-1){
		perror("MSG-RCV-ERR");
		exit(1);
	}
	strcat(buffer," my name is q");
	printf("msg rec:%s\n",buffer);
	close(sockid);
}
```
## Program-3.1 : TCP-client
```c
#include<stdio.h>
#include<stdlib.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<netinet/in.h>
main(int argc, char * argv[])
{
	struct sockaddr_in s;
	int sockid,rval;
	char m1[20],m2[20];
	sockid = socket(AF_INET,SOCK_STREAM,0);
	if(sockid== -1)
	{
		perror("SOCK-CRE-ERR");
		exit(1);
	}
	system("clear");

	s.sin_family = AF_INET;
	s.sin_addr.s_addr=inet_addr(argv[1]);
	s.sin_port = htons(atoi(argv[2]));
	rval = connect(sockid,(struct sockaddr *)&s,sizeof(s));
	if(rval == -1)
	{
		perror("CONN-ERR");
		close(sockid);
		exit(1);
	}
	printf("Enter the request message:");
	scanf("%s",m1);
	rval= send(sockid,m1,sizeof(m1),0);
	if(rval == -1)
	{
		perror("MSG-SND-ERR");
		close(sockid);
		exit(1);
	}
	printf("Message sent successfully");
	rval = recv(sockid,m2,sizeof(m2),0);
	if(rval == -1)
	{
		perror("MSG-RCV-ERR");
		close(sockid);
		exit(1);
	}
	printf("\nServer response is %s",m2);
	close(sockid);
}
```
## Program-3.2 (TCP-server)
```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(int argc, char *argv[]) {
    int sid, sid1, rval;
    struct sockaddr_in s, c;
    char buffer[20];
    int clen;

    system("clear");

    if (argc < 3) {
        printf("\nUSAGE : %s IP_ADDRESS PORT#\n", argv[0]);
        exit(0);
    }

    sid = socket(AF_INET, SOCK_STREAM, 0);
    if (sid == -1) {
        perror("SOCK-CRE-ERR:");
        exit(1);
    }

    /* DEFINING NAME OF THE SERVICE */
    s.sin_family = AF_INET;
    s.sin_addr.s_addr = inet_addr(argv[1]);
    s.sin_port = htons(atoi(argv[2]));

    /* BIND SOCKET - indicates the process that is listening */
    rval = bind(sid, (struct sockaddr *)&s, sizeof(s));
    if (rval == -1) {
        perror("BIND-ERR:");
        close(sid);
        exit(1);
    }

    rval = listen(sid, 5); // range: 1-5
    if (rval == -1) {
        perror("LISTEN-ERR:");
        close(sid);
        exit(1);
    }

    clen = sizeof(c);
    sid1 = accept(sid, (struct sockaddr *)&c, &clen);
    rval = recv(sid1, buffer, sizeof(buffer), 0);

    if (rval == -1) {
        perror("MSG-RCV-ERR:");
    } else {
        printf("\nClient request is %s\n", buffer);
    }

    rval = send(sid1, buffer, sizeof(buffer), 0);
    if (rval == -1) {
        perror("MSG-SND-ERR:");
    } else {
        printf("\nResponse sent\n");
    }

    close(sid);
    close(sid1);

    return 0;
}

```