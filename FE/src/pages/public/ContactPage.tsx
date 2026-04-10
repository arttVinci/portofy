import { useOutletContext } from "react-router-dom";
import type { ContactViewProps } from "../../templates/subTemp/views/ContactView";
import ContactView from "../../templates/subTemp/views/ContactView";

export default function ContactPage() {
  const contextData = useOutletContext<ContactViewProps>();

  const template = contextData?.profile?.theme || "default";

  if (template === "subTemp") {
    return <ContactView {...contextData} />;
  }

  return null;
}
