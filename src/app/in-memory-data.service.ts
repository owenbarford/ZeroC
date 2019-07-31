import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const blogs = [
      { id: 1, blogName: 'The Buying Process' },
      { id: 2, blogName: 'Paying for Extras' },
      { id: 3, blogName: 'Home Tour' },
      { id: 4, blogName: 'Moving In' },
      { id: 5, blogName: 'Ventilation System' },
      { id: 6, blogName: 'Dealing with Customer Care' },
      { id: 7, blogName: 'Taps' },
      { id: 8, blogName: 'Leaking Showers' },
      { id: 9, blogName: 'The Garage' },
      { id: 10, blogName: 'The Seal Around the Gas Hob' },
      { id: 11, blogName: 'The Sealant Experts' },
      { id: 12, blogName: 'Adventures with Trees' },
      { id: 13, blogName: 'Glazing Damage and Frame Adjustment' },
      { id: 14, blogName: 'The Wood by the North' },
      { id: 15, blogName: 'Where did the Burm by the Road Go' },
      { id: 16, blogName: 'Feed-In-Tariff Problems' },
      { id: 17, blogName: 'Adding Snagging to the Contract for Sale' },
      { id: 18, blogName: 'Checking the Kitchen Plinths' },
      { id: 19, blogName: 'Garden slope doubles as ski slope' },
      { id: 20, blogName: 'House Render and cracks' },
      { id: 21, blogName: 'Damage to new appliances' },
      { id: 22, blogName: 'Changes to the site team' },
    ];
    return {blogs};
  }
}
