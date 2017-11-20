export class DummyService {
  private servers = [
    {
       id: 1,
       name:'Lionel Messi',
       list: [{
        id:4,
        name: 'Barcelona1',
        status: 'online',
        teamList:[{
          name: 'BarcaUefa11',
          status: 'BarcaLaLiga11'},
        {
          name: 'BarcaUefa12',
          status: 'BarcaLaLiga12'},
        {
          name: 'BarcaUefa13',
          status: 'BarcaLaLiga13'}
      ],
       
      },
      {
        id:5,
        name: 'Barcelona2',
        status: 'offline',
        teamList:[{
          name: 'BarcaUefa21',
          status: 'BarcaLaLiga21'},
        {
          name: 'BarcaUefa22',
          status: 'BarcaLaLiga22'},
        {
          name: 'BarcaUefa23',
          status: 'BarcaLaLiga23'}
      ],
       
      },
      {
        id:6,
        name: 'Barcelona3',
        status: 'online',
        teamList:[{
          name: 'BarcaUefa31',
          status: 'BarcaLaLiga31'},
        {
          name: 'BarcaUefa32',
          status: 'BarcaLaLiga32'},
        {
          name: 'BarcaUefa33',
          status: 'BarcaLaLiga33'}
      ],
      }
      ]
    },
    {
      id: 2,
      name:'Isco',
      list: [{
        id:7,
        name: 'Real Madrid1',
        status: 'online',
        teamList:[{
          name: 'RmUefa11',
          status: 'RmLaLiga11'},
        {
          name: 'RmUefa12',
          status: 'RmLaLiga12'},
        {
          name: 'RmUefa13',
          status: 'RmLaLiga13'}
      ],
      },
      {
        id:8,
        name: 'Real Madrid2',
        status: 'offline',        
        teamList:[{
          name: 'BarcaUefa11',
          status: 'BarcaLaLiga11'},
        {
          name: 'BarcaUefa12',
          status: 'BarcaLaLiga12'},
        {
          name: 'BarcaUefa13',
          status: 'BarcaLaLiga13'}
      ],
      },
      {
        id:9,
        name: 'Real Madrid3',
        status: 'online',
        teamList:[{
          name: 'BarcaUefa11',
          status: 'BarcaLaLiga11'},
        {
          name: 'BarcaUefa12',
          status: 'BarcaLaLiga12'},
        {
          name: 'BarcaUefa13',
          status: 'BarcaLaLiga13'}
      ],
      }
      ]
    },
    {
      id: 3,
      name:'Gerrade Pique',
      list: [{
        id:10,
        name: 'Spain1',
        status: 'online',
        teamList:[{
          name: 'BarcaUefa11',
          status: 'BarcaLaLiga11'},
        {
          name: 'BarcaUefa12',
          status: 'BarcaLaLiga12'},
        {
          name: 'BarcaUefa13',
          status: 'BarcaLaLiga13'}
      ],
      },
      {
        id:11,
        name: 'Spain2',
        status: 'offline',
        teamList:[{
          name: 'BarcaUefa11',
          status: 'BarcaLaLiga11'},
        {
          name: 'BarcaUefa12',
          status: 'BarcaLaLiga12'},
        {
          name: 'BarcaUefa13',
          status: 'BarcaLaLiga13'}
      ],
      },
      {
        id:12,
        name: 'Spain3',
        status: 'online',
        teamList:[{
          name: 'BarcaUefa11',
          status: 'BarcaLaLiga11'},
        {
          name: 'BarcaUefa12',
          status: 'BarcaLaLiga12'},
        {
          name: 'BarcaUefa13',
          status: 'BarcaLaLiga13'}
      ],
      }
      ]
    }
  ];

  getServers() {
    return this.servers;
  }

  getServerList(id: number) {
    const server = this.servers.find(
      (p) => {
        return p.id === id;
      }
    );
    return server.list;
  }
  
  getServerTeamList(  id: number, Lstid:number){ 
   // console.log("day: dummy: " + Lstid);
   
   const server = this.servers.find(
    (q) => {
      return q.id === id;
    }
  );

  const serverTeam =  server.list.find((q) => {
    return q.id === Lstid;
  });

    return serverTeam.teamList;
    
  }


}
