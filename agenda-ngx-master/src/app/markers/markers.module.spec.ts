import { MarkersModule } from './markers.module';

describe('MarkersModule', () => {
  let markersModule: MarkersModule;

  beforeEach(() => {
    markersModule = new MarkersModule();
  });

  it('should create an instance', () => {
    expect(markersModule).toBeTruthy();
  });
});
