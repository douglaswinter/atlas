import type { AxiosInstance } from "axios";
import { createPlansApi, type PlansResponse } from "./plans";

describe("createPlansApi", () => {
  let client: AxiosInstance;
  let api: ReturnType<typeof createPlansApi>;

  beforeEach(() => {
    client = {
      get: vi.fn(),
    } as unknown as AxiosInstance;

    api = createPlansApi(client);
  });

  it("calls GET /plans on getAll()", async () => {
    const mockResponse: PlansResponse = {
      plans: [
        {
          name: "count",
          description: "Reads from a number of devices.",
          schema: {},
        },
        {
          name: "another plan",
          description: "a placeholder",
          schema: {},
        },
      ],
    };

    (client.get as any).mockResolvedValue({ data: mockResponse });

    const response = await api.getAll();

    expect(client.get).toHaveBeenCalledWith("/plans");
    expect(response).toEqual(mockResponse);
  });

  it("calls GET /plans/{name} on get(name)", async () => {
    const planName = "count";
    const mockPlan = {
      name: planName,
      description: "Reads from a number of devices.",
      schema: {},
    };

    (client.get as any).mockResolvedValue({ data: mockPlan });

    const response = await api.get(planName);

    expect(client.get).toHaveBeenCalledWith(`/plans/${planName}`);
    expect(response).toEqual(mockPlan);
  });
});
