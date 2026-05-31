// @ts-types="solid-js"
import {
  createSignal, // @ts-types="solid-js"
  JSX, // @ts-types="solid-js"
  Show,
} from "solid-js";
import { IconChevronsLeft, IconChevronsRight } from "./icons.tsx";

interface SidePanelProps {
  children?: JSX.Element;
  visible: boolean;
}

const SidePanel = (props: SidePanelProps) => {
  const clazz = () => "side-panel";

  return (
    <div class={clazz()}>
      {props.children}
    </div>
  );
};

export interface ContentPanelProps {
  children: JSX.Element;
  sidepanel: JSX.Element;
}
const ContentPanel = (props: ContentPanelProps) => {
  const [sidePanelVisible, setSidePanelVisible] = createSignal(true);
  const openPanel = () => setSidePanelVisible(true);
  const closePanel = () => setSidePanelVisible(false);

  return (
    <div class="content">
      <div class="content-container">
        <SidePanel visible={sidePanelVisible()}>
          <Show when={sidePanelVisible()}>
            <div class="side-panel-open-header">
              <button
                type="button"
                class="side-panel-btn"
                onclick={closePanel}
              >
                <IconChevronsLeft size="4em" />
              </button>
            </div>
            {props.sidepanel}
          </Show>

          <Show when={!sidePanelVisible()}>
            <div class="side-panel-close-header">
              <button
                type="button"
                class="side-panel-btn"
                onclick={openPanel}
              >
                <IconChevronsRight size="4em" />
              </button>
            </div>
          </Show>
        </SidePanel>

        <div class="center-panel">
          {props.children}
        </div>
        <SidePanel visible={sidePanelVisible()} />
      </div>
    </div>
  );
};

export default ContentPanel;
