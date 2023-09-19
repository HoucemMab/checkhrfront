import { TestBed } from '@angular/core/testing';

import { EventwebsocketService } from './eventwebsocket.service';

describe('EventwebsocketService', () => {
  let service: EventwebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventwebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
